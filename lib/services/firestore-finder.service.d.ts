import { Finder } from '../models';
import { FirestoreRef } from '../types';
import { FindCriteriaOptions } from '../options';
/**
 * @description class find firestore data at once
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
     * @description Make FirestoreFetcher instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreFetcher
     */
    static from(ref: FirestoreRef): FirestoreFinder;
    constructor(ref: FirestoreRef);
    readonly ref: FirestoreRef;
    /**
     * @description find firestore data at once
     * @param options: { mapper,
     *         errorHandler,
     *         completionHandler } | undefined
     */
    find<T = any>(options?: FindCriteriaOptions<T>): Promise<any>;
}
