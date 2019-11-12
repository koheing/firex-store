import { FirestoreRef } from '../types'
import { FirestoreReaderServiceFactory } from './helpers'

/**
 * Return factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @returns FirestoreReaderServiceFactory
 */
export const from = (ref: FirestoreRef) =>
  new FirestoreReaderServiceFactory(ref)
