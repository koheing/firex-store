import { FirestoreRef } from '../../types';
import { FirestoreSubscriber, FirestoreFinder } from '../../services';
/**
 * Factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @method bindTo(statePropName): return FirestoreSubscriber
 * @method once: return FirestoreFinder
 */
export declare class FirestoreReaderServiceFactory {
    private _ref;
    constructor(ref: FirestoreRef);
    /**
     * Return FirestoreSubscriber instance
     * @param statePropName: state property bound to firestore data
     * @return FirestoreSubscriber
     */
    bindTo(statePropName: string): FirestoreSubscriber;
    /**
     * Return FirestoreFinder instance
     * @return FirestoreFinder
     */
    once(): FirestoreFinder;
}
