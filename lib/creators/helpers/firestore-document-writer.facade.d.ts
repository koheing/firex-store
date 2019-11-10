import { AppErrorOr } from '../../types';
import { SetCriteriaOptions } from '../../options';
import { Transaction, MergeSetter, Setter } from '../../models';
/**
 * @description facade of FirestoreSetter and FirestoreMergeSetter
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
     * @description Call it if you wanna transaction
     * @return `FirestoreDocumentWriterFacade class instance`
     */
    transaction(): FirestoreDocumentWriterFacade;
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
    /**
     * @description Firestore.collection('hoge').doc('fuga').set, merge is true. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : { mapper,
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    mergeSet<T = any>(data: any, options?: SetCriteriaOptions<T>): Promise<AppErrorOr<void>>;
}
