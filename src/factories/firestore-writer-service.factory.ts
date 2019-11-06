import { FirestoreSetter, FirestoreAdder } from '../services'
import * as firebase from 'firebase'

type Reference =
  | firebase.firestore.DocumentReference
  | firebase.firestore.CollectionReference

type AddOrSet<T> = T extends firebase.firestore.CollectionReference
  ? FirestoreAdder
  : FirestoreSetter

export class FirestoreWriterFactory<T extends Reference> {
  private _ref: T

  constructor(ref: T) {
    this._ref = ref
  }

  newData(): AddOrSet<T> {
    return (this._ref instanceof firebase.firestore.DocumentReference
      ? FirestoreSetter.to(this._ref)
      : FirestoreAdder.to(this
          ._ref as firebase.firestore.CollectionReference)) as AddOrSet<T>
  }
}
