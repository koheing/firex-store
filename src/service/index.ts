import { FireMutation } from '../types'
import { Unsubscribe } from 'firebase'
import { CriteriaOptions } from '../criteria-options.interface'
import { mapToIfDefined } from './utils'

interface SubscribeCriteria<T, U> extends CriteriaOptions<T> {
  ref: U
  fireMutation: FireMutation
}

interface FindCriteria<T, U> extends CriteriaOptions<T> {
  ref: U
}

export class FirestoreService {
  static subscribe<T = any>({
    ref,
    fireMutation,
    mapper,
    errorHandler,
    onCompleted
  }: SubscribeCriteria<T, firebase.firestore.DocumentReference>): Unsubscribe {
    return ref.onSnapshot(
      (doc) => {
        if (!doc.exists) {
          return
        }
        const payload = mapToIfDefined(doc, mapper)

        fireMutation('added', payload)
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
    fireMutation,
    mapper,
    errorHandler,
    onCompleted
  }: SubscribeCriteria<
    T,
    firebase.firestore.CollectionReference | firebase.firestore.Query
  >): Unsubscribe {
    return ref.onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (!change.doc.exists) {
            return
          }
          const payload = mapToIfDefined(change.doc, mapper)

          fireMutation(change.type, payload)
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

  static find<T = any>({
    ref,
    mapper,
    errorHandler,
    onCompleted
  }: FindCriteria<T, firebase.firestore.DocumentReference>): Promise<T | any> {
    return ref
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return
        }

        const payload = mapToIfDefined(doc, mapper)

        return payload
      })
      .catch((error: any) =>
        errorHandler ? errorHandler(error) : console.error(error)
      )
      .finally(() => {
        if (!onCompleted) {
          return
        }
        onCompleted()
      })
  }

  static findAll<T = any>({
    ref,
    mapper,
    errorHandler,
    onCompleted
  }: FindCriteria<
    T,
    firebase.firestore.CollectionReference | firebase.firestore.Query
  >): Promise<T | any> {
    return ref
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          if (!doc.exists) {
            return
          }
          const payload = mapToIfDefined(doc, mapper)

          return payload
        })
      )
      .catch((error: any) =>
        errorHandler ? errorHandler(error) : console.error(error)
      )
      .finally(() => {
        if (!onCompleted) {
          return
        }
        onCompleted()
      })
  }
}
