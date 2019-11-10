import { AppErrorOr, DocumentId } from '../types';
import { Adder } from '../models';
import { AddCriteriaOptions } from '../options';
/**
 * @description class add data to firestore
 *
 * @example
 *   FirestoreAdder
 *     .to(firebase.firestore().collection('collection'))
 *     .add(data, {
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export declare class FirestoreAdder implements Adder {
    private _ref;
    static to(ref: firebase.firestore.CollectionReference): FirestoreAdder;
    constructor(ref: firebase.firestore.CollectionReference);
    readonly ref: firebase.firestore.CollectionReference;
    /**
     * @description Firestore.collection('hoge').add
     * @param data : add data to firestore
     * @param options : {
     *         mapper,
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `DocumentId(string)` or `AppError`
     */
    add<T = any>(data: any, options?: AddCriteriaOptions<T>): Promise<AppErrorOr<DocumentId>>;
}
