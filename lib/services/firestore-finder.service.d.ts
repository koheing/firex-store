import { Finder } from '../models';
import { FirestoreRef, NullOr } from '../types';
import { FindCriteriaOptions } from '../options';
/**
 * @description class find firestore data at once
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
     * @description Make FirestoreFinder instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreFinder
     */
    static from(ref: FirestoreRef): FirestoreFinder;
    constructor(ref: FirestoreRef);
    readonly ref: FirestoreRef;
    /**
     * @description find firestore data at once
     * @param options: {
     *         mapper,
     *         errorHandler,
     *         completionHandler } | undefined
     * @returns null | error | any
     *   - error: if you defined errorHandler, it changed any
     */
    find<T = any>(options?: FindCriteriaOptions<T>): Promise<NullOr<T | any>>;
}
