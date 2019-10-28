import { FirestoreUnsubscriber } from '../services'

/**
 * @description return FirestoreUnsubscriber instance
 * @param statePropName state property bound to firestore data
 * @returns FirestoreUnsubscriber
 */
export const on = (statePropName: string): FirestoreUnsubscriber =>
  FirestoreUnsubscriber.on(statePropName)
