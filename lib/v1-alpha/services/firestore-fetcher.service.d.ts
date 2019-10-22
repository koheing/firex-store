import { Fetch } from '../models';
import { FirestoreRef } from '../types';
import { FindCriteriaOptions } from '../options';
/**
 * @description class fetch firestore data at once
 *
 * @example
 *   FirestoreFetcher
 *     .where(firebase.firestore().collection('collection'))
 *     .fetch({
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export declare class FirestoreFetcher implements Fetch {
    private _ref;
    /**
     * @description Make FirestoreFetcher instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreFetcher
     */
    static where(ref: FirestoreRef): FirestoreFetcher;
    constructor(ref: FirestoreRef);
    readonly ref: FirestoreRef;
    /**
     * @description fetch firestore data at once
     * @param options: { mapper,
     *         errorHandler,
     *         completionHandler } | undefined
     */
    fetch<T = any>(options?: FindCriteriaOptions<T>): Promise<any>;
}
