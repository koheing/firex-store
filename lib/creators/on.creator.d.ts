import { FirestoreUnsubscriber } from '../services';
/**
 * Return FirestoreUnsubscriber instance
 * @param statePropName state property bound to firestore data
 * @returns FirestoreUnsubscriber
 */
export declare const on: (statePropName: string) => FirestoreUnsubscriber;
