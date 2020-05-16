import { CallMutation, NullOr } from '../types'
import { Unsubscribe } from 'firebase'
import { SubscribeCriteriaOptions, FindCriteriaOptions } from '../options'
import {
  toDocumentResult,
  callDocumentMutation,
  callCollectionMutation,
  notifyNotFound,
  notifyErrorOccurred,
  notifyCompletionIfDefined,
} from './helpers'

interface SubscribeCriteria<T, U> extends SubscribeCriteriaOptions<T> {
  ref: U
  callMutation: CallMutation
}

interface FindCriteria<T, U> extends FindCriteriaOptions<T> {
  ref: U
}

export class FirestoreService {
  static subscribe<T = any>({
    ref,
    callMutation,
    mapper,
    errorHandler,
    completionHandler,
    afterMutationCalled,
    notFoundHandler,
    onCompleted,
  }: SubscribeCriteria<T, firebase.firestore.DocumentReference>): Unsubscribe {
    return ref.onSnapshot(
      (snapshot) =>
        !snapshot.exists
          ? notifyNotFound('document', notFoundHandler)
          : callDocumentMutation<T>({
              snapshot,
              callMutation,
              mapper,
              afterMutationCalled,
            }),
      (error: any) => notifyErrorOccurred(error, errorHandler),
      () =>
        notifyCompletionIfDefined(
          completionHandler ? completionHandler : onCompleted
        )
    )
  }

  static subscribeAll<T = any>({
    ref,
    callMutation,
    mapper,
    errorHandler,
    completionHandler,
    afterMutationCalled,
    notFoundHandler,
    onCompleted,
  }: SubscribeCriteria<
    T,
    firebase.firestore.CollectionReference | firebase.firestore.Query
  >): Unsubscribe {
    return ref.onSnapshot(
      (snapshot) =>
        snapshot.empty
          ? notifyNotFound('collection', notFoundHandler, true)
          : callCollectionMutation<T>({
              snapshot,
              callMutation,
              mapper,
              afterMutationCalled,
              notifyNotFound: () =>
                notifyNotFound('collection', notFoundHandler, false),
            }),
      (error: any) => notifyErrorOccurred(error, errorHandler),
      () =>
        notifyCompletionIfDefined(
          completionHandler ? completionHandler : onCompleted
        )
    )
  }

  static async find<T = any>({
    ref,
    mapper,
    errorHandler,
    completionHandler,
    onCompleted,
  }: FindCriteria<T, firebase.firestore.DocumentReference>): Promise<
    NullOr<T | any>
  > {
    const result = await ref
      .get()
      .then((doc) => (!doc.exists ? null : toDocumentResult(doc, mapper)))
      .catch((error: any) => notifyErrorOccurred(error, errorHandler))

    notifyCompletionIfDefined(
      completionHandler ? completionHandler : onCompleted
    )
    return result
  }

  static async findAll<T = any>({
    ref,
    mapper,
    errorHandler,
    completionHandler,
    onCompleted,
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

    notifyCompletionIfDefined(
      completionHandler ? completionHandler : onCompleted
    )

    return result
  }
}
