import {
  FirestoreSetter,
  FirestoreAdder,
  FirestoreMergeSetter
} from '../services'
import * as firebase from 'firebase'
import { DocumentOrCollection } from '../types'

type AdderOrSetterOn<T> = T extends firebase.firestore.DocumentReference
  ? FirestoreSetter
  : FirestoreAdder

type AdderOrMergeSetterOn<T> = T extends firebase.firestore.DocumentReference
  ? FirestoreMergeSetter
  : FirestoreAdder

export class FirestoreWriterFactory<T extends DocumentOrCollection> {
  private _ref: T

  constructor(ref: T) {
    this._ref = ref
  }

  newData(): AdderOrSetterOn<T> {
    return (this._ref instanceof firebase.firestore.DocumentReference
      ? FirestoreSetter.to(this._ref)
      : FirestoreAdder.to(this
          ._ref as firebase.firestore.CollectionReference)) as AdderOrSetterOn<
      T
    >
  }

  existingData(): AdderOrMergeSetterOn<T> {
    return (this._ref instanceof firebase.firestore.DocumentReference
      ? FirestoreMergeSetter.to(this._ref)
      : FirestoreAdder.to(this
          ._ref as firebase.firestore.CollectionReference)) as AdderOrMergeSetterOn<
      T
    >
  }
}
