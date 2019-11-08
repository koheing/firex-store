import {
  FirestoreSetter,
  FirestoreAdder,
  FirestoreMergeSetter
} from '../services'
import * as firebase from 'firebase'
import { DocumentOrCollection, Either } from '../types'
import { CANNOT_CALL_IT_IF_REF_IS_COLLECTION_REFERENCE } from '../errors'

type AdderOrSetterOn<T> = T extends firebase.firestore.DocumentReference
  ? FirestoreSetter
  : FirestoreAdder

type MergeSetterOrError<T> = T extends firebase.firestore.DocumentReference
  ? FirestoreMergeSetter
  : void

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

  existingData(): MergeSetterOrError<T> {
    return (this._ref instanceof firebase.firestore.DocumentReference
      ? FirestoreMergeSetter.to(this._ref)
      : console.error(
          CANNOT_CALL_IT_IF_REF_IS_COLLECTION_REFERENCE
        )) as MergeSetterOrError<T>
  }
}
