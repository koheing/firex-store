import { FirestoreRef } from '../types';
import { FirestoreSubscriber, FirestoreFinder } from '../services';
/**
 * @description factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @method bindTo(statePropName): return FirestoreSubscriber
 * @method once: return FirestoreFinder
 */
declare class FirestoreReaderServiceFactory {
    private _ref;
    constructor(ref: FirestoreRef);
    /**
     * @description return FirestoreSubscriber instance
     * @param statePropName: state property bound to firestore data
     * @return FirestoreSubscriber
     */
    bindTo(statePropName: string): FirestoreSubscriber;
    /**
     * @description return FirestoreFinder instance
     * @return FirestoreFinder
     */
    once(): FirestoreFinder;
}
/**
 * @description return factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 */
export declare const from: (ref: import("../../types").FirestoreRef) => FirestoreReaderServiceFactory;
export {};
