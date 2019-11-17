import { Deleter, Transaction } from '../models';
import { AppErrorOr } from '../types';
import { DeleteOptionsParameter } from '../parameters';
/**
 * Class delete firestore data
 *
 * @example
 *   FirestoreDeleter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .delete({ errorHandler, completionHandler })
 */
export declare class FirestoreDeleter implements Deleter, Transaction {
    private _ref;
    private _isTransaction;
    /**
     * Make FirestoreDeleter instance
     * @param ref: firebase.firestore.DocumentReference
     * @returns FirestoreDeleter
     */
    static to(ref: firebase.firestore.DocumentReference): FirestoreDeleter;
    constructor(ref: firebase.firestore.DocumentReference);
    readonly ref: firebase.firestore.DocumentReference;
    readonly isTransaction: boolean;
    /**
     * Call this if you wanna use transaction
     * @return  `FirestoreSetter class instance`
     */
    transaction(): FirestoreDeleter;
    /**
     * Firestore.collection('hoge').doc('fuga').delete. call `transaction` before call it, if you wanna transaction
     * @param options : {
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    delete(options?: DeleteOptionsParameter): Promise<AppErrorOr<void>>;
}
