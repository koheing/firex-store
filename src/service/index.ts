import { CallMutation, NullOr } from '../types'
import { Unsubscribe } from 'firebase'
import { SubscribeCriteriaOptions, FindCriteriaOptions } from '../options'
import { Payload } from '../models'
import { mapToIfDefined } from './helpers'

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
    onCompleted,
    afterMutationCalled
  }: SubscribeCriteria<T, firebase.firestore.DocumentReference>): Unsubscribe {
    return ref.onSnapshot(
      (doc) => {
        if (!doc.exists) {
          return
        }
        const data = mapToIfDefined(doc, mapper)
        const payload: Payload = { data, isLast: true }

        callMutation('added', payload)

        if (afterMutationCalled) {
          afterMutationCalled(payload)
        }
      },
      (error: any) =>
        errorHandler ? errorHandler(error) : console.error(error),
      () => {
        if (!onCompleted) {
          return
        }
        onCompleted()
      }
    )
  }

  static subscribeAll<T = any>({
    ref,
    callMutation,
    mapper,
    errorHandler,
    onCompleted,
    afterMutationCalled
  }: SubscribeCriteria<
    T,
    firebase.firestore.CollectionReference | firebase.firestore.Query
  >): Unsubscribe {
    return ref.onSnapshot(
      (snapshot) => {
        const length = snapshot.docChanges().length
        snapshot.docChanges().forEach((change, index) => {
          if (!change.doc.exists) {
            return
          }
          const data = mapToIfDefined(change.doc, mapper)
          const payload: Payload = { data, isLast: length === index + 1 }

          callMutation(change.type, payload)

          if (afterMutationCalled) {
            afterMutationCalled(payload)
          }
        })
      },
      (error: any) =>
        errorHandler ? errorHandler(error) : console.error(error),
      () => {
        if (!onCompleted) {
          return
        }
        onCompleted()
      }
    )
  }

  static async find<T = any>({
    ref,
    mapper,
    errorHandler,
    onCompleted
  }: FindCriteria<T, firebase.firestore.DocumentReference>): Promise<
    NullOr<T | any>
  > {
    const result = await ref
      .get()
      .then((doc) => (!doc.exists ? null : mapToIfDefined(doc, mapper)))
      .catch((error: any) =>
        errorHandler ? errorHandler(error) : console.error(error)
      )

    if (onCompleted) {
      onCompleted()
    }
    return result
  }

  static async findAll<T = any>({
    ref,
    mapper,
    errorHandler,
    onCompleted
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

    if (onCompleted) {
      onCompleted()
    }

    return result
  }
}
