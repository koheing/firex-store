import { FirestoreDocumentWriterFacade } from './helpers'
import { FirestoreAdder } from '../services'
import { DocumentOrCollection } from '../types'
import * as firebase from 'firebase'

type AdderOrSetter<T> = T extends firebase.firestore.CollectionReference
  ? FirestoreAdder
  : FirestoreDocumentWriterFacade

/**
 * Return FirestoreAdder or FirestoreDocumentWriterFacade instance
 * Return FirestoreAdder instance if ref is firebase.firestore.CollectionReference,
 * while return FirestoreDocumentWriterFacade if if ref is firebase.firestore.DocumentReference
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference
 * @returns `FirestoreAdder` or `FirestoreDocumentWriterFacade`
 */
export const to = <T extends DocumentOrCollection>(ref: T): AdderOrSetter<T> =>
  (ref instanceof firebase.firestore.CollectionReference
    ? new FirestoreAdder(ref)
    : new FirestoreDocumentWriterFacade(
        ref as firebase.firestore.DocumentReference
      )) as AdderOrSetter<T>
