import { Finder, FirestoreMapper, DocumentResult } from '../models';
import { FirestoreRef, NullOr } from '../types';
import { FindOptionsParameter } from '../parameters';
/**
 * Class find firestore data at once
 * @returns null | error | any
 *   - error: if you defined errorHandler, it changed any
 *
 *
 * @example
 *   class FirestoreMapperModel extends FirestoreMapper {
 *     id: number
 *     name: string
 *     static fromJson(data: { [key: string]: any }) {
 *        return { id: data.id, name: data.name } as FirestoreMapperModel
 *     }
 *   }
 *
 *   FirestoreFinder
 *     .from(firebase.firestore().collection('collection'))
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .find({
 *         errorHandler,
 *         completionHandler
 *     })
 */
export declare class FirestoreFinder implements Finder {
    private _ref;
    private _mapper?;
    /**
     * Make FirestoreFinder instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreFinder
     */
    static from(ref: FirestoreRef): FirestoreFinder;
    constructor(ref: FirestoreRef);
    get ref(): FirestoreRef;
    /**
     * Convert new data with the results of calling a provided function(fromJson)
     * @param className extends FirestoreMapper
     * @returns FirestoreFinder
     */
    mapOf<T extends FirestoreMapper>(className: T): this;
    /**
     * Find firestore data at once
     * @param options: {
     *         mapper,
     *         errorHandler,
     *         completionHandler } | undefined
     * @returns null | error | any
     *   - error: if you defined errorHandler, it changed any
     */
    find<T = any>(options?: FindOptionsParameter<T>): Promise<NullOr<T | T[] | DocumentResult | DocumentResult[] | Error>>;
}
