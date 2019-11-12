import { FirestoreRef } from '../../types'
import { FirestoreSubscriber, FirestoreFinder } from '../../services'

/**
 * Factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @method bindTo(statePropName): return FirestoreSubscriber
 * @method once: return FirestoreFinder
 */
export class FirestoreReaderServiceFactory {
  private _ref: FirestoreRef

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

  /**
   * Return FirestoreSubscriber instance
   * @param statePropName: state property bound to firestore data
   * @return FirestoreSubscriber
   */
  bindTo(statePropName: string): FirestoreSubscriber {
    return FirestoreSubscriber.from(this._ref).bindTo(statePropName)
  }

  /**
   * Return FirestoreFinder instance
   * @return FirestoreFinder
   */
  once(): FirestoreFinder {
    return FirestoreFinder.from(this._ref)
  }
}
