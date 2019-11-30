import { AppErrorOr } from '../../types';
import { SetOptionsParameter, DeleteOptionsParameter } from '../../parameters';
import { Transaction, MergeSetter, Setter, FirestoreMapper } from '../../models';
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
    private _mapper?;
    constructor(ref: firebase.firestore.DocumentReference);
    get ref(): firebase.firestore.DocumentReference;
    get isTransaction(): boolean;
    /**
     * Call it if you wanna transaction
     * @return `FirestoreDocumentWriterFacade class instance`
     */
    transaction(): this;
    /**
     * Convert data before registering data in Firestoren with the results of calling a provided function(toJson)
     * @param className extends FirestoreMapper
     * @returns FirestoreAdder
     */
    mapOf<T extends FirestoreMapper>(className: T): this;
    /**
     * Firestore.collection('hoge').doc('fuga').set, merge is false. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : {
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    set<T = any>(data: any, options?: SetOptionsParameter<T>): Promise<AppErrorOr<void>>;
    /**
     * Firestore.collection('hoge').doc('fuga').set, merge is true. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : {
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
