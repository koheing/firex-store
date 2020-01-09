import { AppErrorOr, DocumentId } from '../types';
import { Adder, FirestoreMapper } from '../models';
import { AddOptionsParameter } from '../parameters';
/**
 *  Class add data to firestore
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
 *   FirestoreAdder
 *     .to(firebase.firestore().collection('collection'))
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .add(data, {
 *         errorHandler,
 *         completionHandler
 *     })
 */
export declare class FirestoreAdder implements Adder {
    private _ref;
    private _mapper?;
    static to(ref: firebase.firestore.CollectionReference): FirestoreAdder;
    constructor(ref: firebase.firestore.CollectionReference);
    get ref(): firebase.firestore.CollectionReference;
    /**
     * Convert data before registering data in Firestore with the results of calling a provided function(toJson)
     * @param className extends FirestoreMapper
     * @returns FirestoreAdder
     */
    mapOf<T extends FirestoreMapper>(className: T): this;
    /**
     * Firestore.collection('hoge').add
     * @param data : add data to firestore
     * @param options : {
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `DocumentId(string)` or `AppError`
     */
    add<T = any>(data: any, options?: AddOptionsParameter<T>): Promise<AppErrorOr<DocumentId>>;
}
