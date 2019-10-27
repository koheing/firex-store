import { FirestoreUnsubscriber } from '../services'

// class FirestoreUnreaderServiceFactory {
//   private _statePropName: string

//   constructor(statePropName: string) {
//     this._statePropName = statePropName
//   }

//   unbind(): FirestoreUnsubscriber {
//     return FirestoreUnsubscriber.unbind(this._statePropName)
//   }
// }

/**
 * @description return firestoreUnsubscriber instance
 * @param statePropName : state property bound to firestore data
 */
export const unbind = (statePropName: string): FirestoreUnsubscriber =>
  FirestoreUnsubscriber.unbind(statePropName)
