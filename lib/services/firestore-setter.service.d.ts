import { AppErrorOr } from '../types';
import { Setter, Transaction } from '../models';
import { SetCriteriaOptions } from '../options';
/**
 * @description class set data to firestore
 *
 * @example
 *   FirestoreSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .set(data, {
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export declare class FirestoreSetter implements Setter, Transaction {
    private _ref;
    private _isTransaction;
    /**
     * @description Make FirestoreSetter instance
     * @param ref: firebase.firestore.DocumentReference
     * @returns FirestoreSetter
     */
    static to(ref: firebase.firestore.DocumentReference): FirestoreSetter;
    constructor(ref: firebase.firestore.DocumentReference);
    readonly ref: firebase.firestore.DocumentReference;
    readonly isTransaction: boolean;
    /**
     * @description Call this if you wanna use transaction
     * @return  `FirestoreSetter class instance`
     */
    transaction(): FirestoreSetter;
    /**
     * @description Firestore.collection('hoge').doc('fuga').set, merge is false. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : {
     *         mapper,
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    set<T = any>(data: any, options?: SetCriteriaOptions<T>): Promise<AppErrorOr<void>>;
}
