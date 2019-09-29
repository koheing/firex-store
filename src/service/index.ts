import { CallMutation, NullOr } from '../types'
import { Unsubscribe } from 'firebase'
import { SubscribeCriteriaOptions, FindCriteriaOptions } from '../options'
import {
  mapToIfDefined,
  callDocumentMutation,
  callCollectionMutation
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
    notFoundHandler
  }: SubscribeCriteria<T, firebase.firestore.DocumentReference>): Unsubscribe {
    const notifyNotFound = () =>
      notFoundHandler
        ? notFoundHandler('document')
        : console.log('data not found')
    return ref.onSnapshot(
      (doc) => {
        !doc.exists
          ? notifyNotFound()
          : callDocumentMutation({
              snapshot: doc,
              callMutation,
              mapper,
              afterMutationCalled
            })
      },
      (error: any) =>
        errorHandler ? errorHandler(error) : console.error(error),
      () => {
        if (!completionHandler) {
          return
        }
        completionHandler()
      }
    )
  }

  static subscribeAll<T = any>({
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
  >): Unsubscribe {
    const notifyNotFound = (isAll: boolean) =>
      notFoundHandler
        ? notFoundHandler('collection', isAll)
        : console.log('data not found')
    return ref.onSnapshot(
      (snapshot) => {
        snapshot.empty
          ? notifyNotFound(true)
          : callCollectionMutation({
              snapshot,
              callMutation,
              mapper,
              afterMutationCalled,
              notifyNotFound
            })
      },
      (error: any) =>
        errorHandler ? errorHandler(error) : console.error(error),
      () => {
        if (!completionHandler) {
          return
        }
        completionHandler()
      }
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
      .then((doc) => (!doc.exists ? null : mapToIfDefined(doc, mapper)))
      .catch((error: any) =>
        errorHandler ? errorHandler(error) : console.error(error)
      )

    if (completionHandler) {
      completionHandler()
    }
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
              !doc.exists ? null : mapToIfDefined(doc, mapper)
            )
      )
      .then((documentResults) => {
        const resultWithoutNull = documentResults.filter((it) => it !== null)
        return resultWithoutNull.length > 0 ? resultWithoutNull : null
      })
      .catch((error: any) =>
        errorHandler ? errorHandler(error) : console.error(error)
      )

    if (completionHandler) {
      completionHandler()
    }

    return result
  }
}
