import { FirestoreRef } from '../../types'
import * as firebase from 'firebase'

export const isDocumentRef = (
  ref: FirestoreRef
): ref is firebase.firestore.DocumentReference =>
  ref instanceof firebase.firestore.DocumentReference
