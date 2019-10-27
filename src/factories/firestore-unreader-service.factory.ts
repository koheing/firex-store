import { FirestoreUnsubscriber } from '../services'

/**
 * @description factory of FirestoreUnsubscriber
 * @param statePropName: state property bound to firestore data
 * @method on: return FirestoreUnsubscriber
 */
class FirestoreUnreaderServiceFactory {
  private _statePropName: string

  constructor(statePropName: string) {
    this._statePropName = statePropName
  }

  /**
   * @description return FirestoreUnsubscriber instance
   * @param statePropName : state property bound to firestore data
   */
  unbind(): FirestoreUnsubscriber {
    return FirestoreUnsubscriber.on(this._statePropName)
  }
}

/**
 * @description return factory of FirestoreUnsubscriber
 * @param statePropName : state property bound to firestore data
 */
export const on = (statePropName: string): FirestoreUnreaderServiceFactory =>
  new FirestoreUnreaderServiceFactory(statePropName)
