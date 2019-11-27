import { AppErrorOr } from '../types';
import { Setter, Transaction, FirestoreMapper } from '../models';
import { SetOptionsParameter } from '../parameters';
/**
 * Class set data to firestore
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
 *
 *   FirestoreSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .set(data, {
 *         errorHandler,
 *         completionHandler
 *     })
 */
export declare class FirestoreSetter implements Setter, Transaction {
    private _ref;
    private _isTransaction;
    private _mapper?;
    /**
     * Make FirestoreSetter instance
     * @param ref: firebase.firestore.DocumentReference
     * @returns FirestoreSetter
     */
    static to(ref: firebase.firestore.DocumentReference): FirestoreSetter;
    constructor(ref: firebase.firestore.DocumentReference);
    readonly ref: firebase.firestore.DocumentReference;
    readonly isTransaction: boolean;
    /**
     * Call this if you wanna use transaction
     * @return  `FirestoreSetter class instance`
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
}
