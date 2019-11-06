import { FirestoreWriterFactory } from '../factories'

type Reference =
  | firebase.firestore.DocumentReference
  | firebase.firestore.CollectionReference

export const to = <T extends Reference>(ref: T) =>
  new FirestoreWriterFactory<T>(ref)
