import { AppErrorOr } from '../types';
import { MergeSetter, Transaction } from '../models';
import { SetOptionsParameter } from '../parameters';
/**
 * Class merge set data to firestore
 *
 * @example
 *   FirestoreMergeSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .mergeSet(data, {
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export declare class FirestoreMergeSetter implements MergeSetter, Transaction {
    private _ref;
    private _isTransaction;
    /**
     *  Make FirestoreMergeSetter instance
     * @param ref: firebase.firestore.DocumentReference
     * @returns FirestoreMergeSetter
     */
    static to(ref: firebase.firestore.DocumentReference): FirestoreMergeSetter;
    constructor(ref: firebase.firestore.DocumentReference);
    readonly ref: firebase.firestore.DocumentReference;
    readonly isTransaction: boolean;
    /**
     * Call this if you wanna use transaction
     * @return `FirestoreMergeSetter class instance`
     */
    transaction(): FirestoreMergeSetter;
    /**
     * Firestore.collection('hoge').doc('fuga').set, merge is true. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : {
     *         mapper,
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    mergeSet<T = any>(data: any, options?: SetOptionsParameter<T>): Promise<AppErrorOr<void>>;
}
