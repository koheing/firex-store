import { FirestoreDocumentWriterFacade } from './helpers'
import { FirestoreAdder } from '../services'
import { DocumentOrCollection } from '../types'
import * as firebase from 'firebase'

type AdderOrSetter<T> = T extends firebase.firestore.CollectionReference
  ? FirestoreAdder
  : FirestoreDocumentWriterFacade

export const to = <T extends DocumentOrCollection>(ref: T): AdderOrSetter<T> =>
  (ref instanceof firebase.firestore.CollectionReference
    ? new FirestoreAdder(ref)
    : new FirestoreDocumentWriterFacade(
        ref as firebase.firestore.DocumentReference
      )) as AdderOrSetter<T>
