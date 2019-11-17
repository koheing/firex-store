import { AppErrorOr } from '../../types';
import { SetOptionsParameter, DeleteOptionsParameter } from '../../parameters';
import { Transaction, MergeSetter, Setter } from '../../models';
/**
 * facade of FirestoreSetter and FirestoreMergeSetter
 * @param ref: firebase.firestore.DocumentReference
 * @method transaction: Call it if you wanna transaction
 * @method set: Firestore.set, merge is false
 * @method mergeSet: Firestore.set, merge is true
 */
export declare class FirestoreDocumentWriterFacade implements Transaction, MergeSetter, Setter {
    private _ref;
    private _isTransaction;
    constructor(ref: firebase.firestore.DocumentReference);
    readonly ref: firebase.firestore.DocumentReference;
    readonly isTransaction: boolean;
    /**
     * Call it if you wanna transaction
     * @return `FirestoreDocumentWriterFacade class instance`
     */
    transaction(): FirestoreDocumentWriterFacade;
    /**
     * Firestore.collection('hoge').doc('fuga').set, merge is false. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : {
     *         mapper,
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    set<T = any>(data: any, options?: SetOptionsParameter<T>): Promise<AppErrorOr<void>>;
    /**
     * Firestore.collection('hoge').doc('fuga').set, merge is true. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : { mapper,
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    mergeSet<T = any>(data: any, options?: SetOptionsParameter<T>): Promise<AppErrorOr<void>>;
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
