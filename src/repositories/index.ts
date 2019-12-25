import {
  CallMutation,
  NullOr,
  AppErrorOr,
  DocumentId,
  Unsubscribe,
  FirestoreRef
} from '../types'
import {
  SubscribeOptionsParameter,
  FindOptionsParameter,
  AddOptionsParameter,
  SetOptionsParameter,
  DeleteOptionsParameter
} from '../parameters'
import {
  toDocumentResult,
  callDocumentMutation,
  callCollectionMutation,
  notifyNotFound,
  notifyErrorOccurred,
  notifyCompletionIfDefined,
  transactionOfSetOrMergeSet,
  transacitonOfDelete
} from './helpers'
import { AppError, Payload, DocumentResult } from '../models'
import { isDocumentRef } from '../utils'

interface SubscribeParameter<T, U> extends SubscribeOptionsParameter<T> {
  statePropName: string
  ref: U
  callMutation: CallMutation
}

interface FindParameter<T, U> extends FindOptionsParameter<T> {
  ref: U
}

interface AddParameter<T, U> extends AddOptionsParameter<T> {
  data: any
  ref: U
}

interface SetParameter<T, U> extends SetOptionsParameter<T> {
  data: any
  ref: U
  merge: boolean
  isTransaction: boolean
}

interface DeleteParamater<T> extends DeleteOptionsParameter {
  ref: T
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
  }: SubscribeParameter<T, firebase.firestore.DocumentReference>): Unsubscribe {
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
  }: SubscribeParameter<
    T,
    firebase.firestore.CollectionReference | firebase.firestore.Query
  >): Unsubscribe {
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

  static async subscribeOnce<T = any>({
    statePropName,
    ref,
    callMutation,
    mapper,
    errorHandler,
    completionHandler,
    afterMutationCalled,
    notFoundHandler
  }: SubscribeParameter<T, FirestoreRef>): Promise<
    NullOr<Error | T | T[] | DocumentResult | DocumentResult[]>
  > {
    const result: NullOr<
      Error | T | T[] | DocumentResult | DocumentResult[]
    > = isDocumentRef(ref)
      ? await this.find({
          ref,
          mapper,
          errorHandler
        })
      : await this.findAll({
          ref,
          mapper,
          errorHandler
        })
    if (result instanceof Error) {
      return result
    }
    if (result === null) {
      const isArray = !isDocumentRef(ref)
      const _type = isArray ? 'collection' : 'document'
      notifyNotFound(_type, notFoundHandler, isArray)
      return result
    }
    const payload: Payload = { data: result, statePropName, isLast: true }
    callMutation('added', payload)

    if (afterMutationCalled) {
      afterMutationCalled(payload)
    }

    if (completionHandler) {
      completionHandler()
    }

    return result
  }

  static async find<T = any>({
    ref,
    mapper,
    errorHandler,
    completionHandler
  }: FindParameter<T, firebase.firestore.DocumentReference>): Promise<
    NullOr<T | DocumentResult | Error>
  > {
    const result: NullOr<T | DocumentResult | Error> = await ref
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
  }: FindParameter<
    T,
    firebase.firestore.CollectionReference | firebase.firestore.Query
  >): Promise<NullOr<T[] | DocumentResult[] | Error>> {
    const result: NullOr<T[] | DocumentResult[] | Error> = await ref
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
  }: AddParameter<T, firebase.firestore.CollectionReference>): Promise<
    AppErrorOr<DocumentId>
  > {
    const _data = mapper ? mapper(data) : data
    const result: AppErrorOr<DocumentId> = await ref
      .add(_data)
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
  }: SetParameter<T, firebase.firestore.DocumentReference>): Promise<
    AppErrorOr<void>
  > {
    const _data = mapper ? mapper(data) : data
    const result: AppErrorOr<void> = !isTransaction
      ? await ref
          .set(_data, { merge })
          .catch((error: AppError) => notifyErrorOccurred(error, errorHandler))
      : await ref.firestore.runTransaction(
          async (transaction) =>
            await transactionOfSetOrMergeSet({
              transaction,
              data: _data,
              ref,
              merge,
              mapper,
              errorHandler
            })
        )

    notifyCompletionIfDefined(completionHandler)

    return result
  }

  static async delete({
    ref,
    isTransaction,
    errorHandler,
    completionHandler
  }: DeleteParamater<firebase.firestore.DocumentReference>) {
    const result: AppErrorOr<void> = !isTransaction
      ? await ref
          .delete()
          .catch((error: AppError) => notifyErrorOccurred(error, errorHandler))
      : await ref.firestore.runTransaction(
          async (transaction) =>
            await transacitonOfDelete({
              ref,
              transaction,
              errorHandler
            })
        )

    notifyCompletionIfDefined(completionHandler)

    return result
  }
}
