import { CallMutation, NullOr, AppErrorOr, DocumentId, Either } from '../types'
import {
  SubscribeCriteriaOptions,
  FindCriteriaOptions,
  CriteriaOptions
} from '../options'
import {
  toDocumentResult,
  callDocumentMutation,
  callCollectionMutation,
  notifyNotFound,
  notifyErrorOccurred,
  notifyCompletionIfDefined
} from './helpers'
import { AppError } from '../models'
import { THIS_ID_HAS_BEEN_ALREADY_USED } from '../errors'

interface SubscribeCriteria<T, U> extends SubscribeCriteriaOptions<T> {
  statePropName: string
  ref: U
  callMutation: CallMutation
}

interface FindCriteria<T, U> extends FindCriteriaOptions<T> {
  ref: U
}

interface AddCriteria<T, U> extends CriteriaOptions<T> {
  data: any
  ref: U
}

interface SetCriteria<T, U> extends CriteriaOptions<T> {
  data: any
  ref: U
  merge: boolean
  isTransaction: boolean
}

export class FirestoreRepository {
  static subscribe<T = any>({
    statePropName,
    ref,
    callMutation,
    mapper,
    errorHandler,
    completionHandler,
    afterMutationCalled,
    notFoundHandler
  }: SubscribeCriteria<
    T,
    firebase.firestore.DocumentReference
  >): firebase.Unsubscribe {
    return ref.onSnapshot(
      (snapshot) =>
        !snapshot.exists
          ? notifyNotFound('document', notFoundHandler)
          : callDocumentMutation<T>({
              statePropName,
              snapshot,
              callMutation,
              mapper,
              afterMutationCalled
            }),
      (error: any) => notifyErrorOccurred(error, errorHandler),
      () => notifyCompletionIfDefined(completionHandler)
    )
  }

  static subscribeAll<T = any>({
    statePropName,
    ref,
    callMutation,
    mapper,
    errorHandler,
    completionHandler,
    afterMutationCalled,
    notFoundHandler
  }: SubscribeCriteria<
    T,
    firebase.firestore.CollectionReference | firebase.firestore.Query
  >): firebase.Unsubscribe {
    return ref.onSnapshot(
      (snapshot) =>
        snapshot.empty
          ? notifyNotFound('collection', notFoundHandler, true)
          : callCollectionMutation<T>({
              statePropName,
              snapshot,
              callMutation,
              mapper,
              afterMutationCalled,
              notifyNotFound: () =>
                notifyNotFound('collection', notFoundHandler, false)
            }),
      (error: any) => notifyErrorOccurred(error, errorHandler),
      () => notifyCompletionIfDefined(completionHandler)
    )
  }

  static async find<T = any>({
    ref,
    mapper,
    errorHandler,
    completionHandler
  }: FindCriteria<T, firebase.firestore.DocumentReference>): Promise<
    NullOr<T | any>
  > {
    const result = await ref
      .get()
      .then((doc) => (!doc.exists ? null : toDocumentResult(doc, mapper)))
      .catch((error: any) => notifyErrorOccurred(error, errorHandler))

    notifyCompletionIfDefined(completionHandler)
    return result
  }

  static async findAll<T = any>({
    ref,
    mapper,
    errorHandler,
    completionHandler
  }: FindCriteria<
    T,
    firebase.firestore.CollectionReference | firebase.firestore.Query
  >): Promise<NullOr<T[] | any | any[]>> {
    const result = await ref
      .get()
      .then((snapshot) =>
        snapshot.empty
          ? []
          : snapshot.docs.map((doc) =>
              !doc.exists ? null : toDocumentResult(doc, mapper)
            )
      )
      .then((documentResults) => {
        const resultsWithoutNull = documentResults.filter((it) => it !== null)
        return resultsWithoutNull.length > 0 ? resultsWithoutNull : null
      })
      .catch((error: any) => notifyErrorOccurred(error, errorHandler))

    notifyCompletionIfDefined(completionHandler)

    return result
  }

  static async add<T = any>({
    data,
    ref,
    mapper,
    errorHandler,
    completionHandler
  }: AddCriteria<T, firebase.firestore.CollectionReference>): Promise<
    AppErrorOr<DocumentId>
  > {
    const result: AppErrorOr<DocumentId> = await ref
      .add(mapper ? mapper(data) : data)
      .then((it) => it.id)
      .catch((error: AppError) => notifyErrorOccurred(error, errorHandler))

    notifyCompletionIfDefined(completionHandler)

    return result
  }

  static async set<T>({
    data,
    ref,
    merge,
    isTransaction,
    mapper,
    errorHandler,
    completionHandler
  }: SetCriteria<T, firebase.firestore.DocumentReference>): Promise<
    AppErrorOr<void>
  > {
    const result: AppErrorOr<void> = !isTransaction
      ? await ref
          .set(mapper ? mapper(data) : data, { merge })
          .catch((error: AppError) => notifyErrorOccurred(error, errorHandler))
      : await ref.firestore.runTransaction(async (transaction) => {
          const appErrorOrIsNotExist: Either<AppError, true> = await transaction
            .get(ref)
            .then((snapshot) => {
              if (!snapshot.exists) {
                return true
              }
              const appError = {
                message: THIS_ID_HAS_BEEN_ALREADY_USED
              } as AppError
              throw appError
            })
            .catch((error: AppError) =>
              notifyErrorOccurred(error, errorHandler)
            )

          if (appErrorOrIsNotExist === true) {
            transaction.set(ref, mapper ? mapper(data) : data, { merge })
            return
          }
          const appError = appErrorOrIsNotExist
          return appError
        })

    notifyCompletionIfDefined(completionHandler)

    return result
  }
}
