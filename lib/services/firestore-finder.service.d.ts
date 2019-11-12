import { Finder } from '../models';
import { FirestoreRef, NullOr } from '../types';
import { FindOptionsParameter } from '../parameters';
/**
 * Class find firestore data at once
 * @returns null | error | any
 *   - error: if you defined errorHandler, it changed any
 *
 *
 * @example
 *   FirestoreFinder
 *     .from(firebase.firestore().collection('collection'))
 *     .find({
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export declare class FirestoreFinder implements Finder {
    private _ref;
    /**
     * Make FirestoreFinder instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreFinder
     */
    static from(ref: FirestoreRef): FirestoreFinder;
    constructor(ref: FirestoreRef);
    readonly ref: FirestoreRef;
    /**
     * Find firestore data at once
     * @param options: {
     *         mapper,
     *         errorHandler,
     *         completionHandler } | undefined
     * @returns null | error | any
     *   - error: if you defined errorHandler, it changed any
     */
    find<T = any>(options?: FindOptionsParameter<T>): Promise<NullOr<T | any>>;
}
