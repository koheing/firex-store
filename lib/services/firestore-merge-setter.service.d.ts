import { AppErrorOr } from '../types';
import { MergeSetter, Transaction, FirestoreMapper } from '../models';
import { SetOptionsParameter } from '../parameters';
/**
 * Class merge set data to firestore
 *
 * @example
 *   class FirestoreMapperModel extends FirestoreMapper {
 *     id: number
 *     name: string
 *     static fromJson(data: { [key: string]: any }) {
 *        return { id: data.id, name: data.name } as FirestoreMapperModel
 *     }
 *     static toJson(data: FirestoreMapperModel) {
 *        return { id: data.id, name: data.name }
 *     }
 *   }
 *   FirestoreMergeSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .mapOf(FirestoreMapperModel)  // <- option
 *     .mergeSet(data, {
 *         errorHandler,
 *         completionHandler
 *     })
 */
export declare class FirestoreMergeSetter implements MergeSetter, Transaction {
    private _ref;
    private _isTransaction;
    private _mapper?;
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
    transaction(): this;
    /**
     * Convert data before registering data in Firestoren with the results of calling a provided function(toJson)
     * @param className extends FirestoreMapper
     * @returns FirestoreMergeSetter
     */
    mapOf<T extends FirestoreMapper>(className: T): this;
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
}
