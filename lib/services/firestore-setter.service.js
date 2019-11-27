"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
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
class FirestoreSetter {
    constructor(ref) {
        this._isTransaction = false;
        this._ref = ref;
    }
    /**
     * Make FirestoreSetter instance
     * @param ref: firebase.firestore.DocumentReference
     * @returns FirestoreSetter
     */
    static to(ref) {
        return new FirestoreSetter(ref);
    }
    get ref() {
        return this._ref;
    }
    get isTransaction() {
        return this._isTransaction;
    }
    /**
     * Call this if you wanna use transaction
     * @return  `FirestoreSetter class instance`
     */
    transaction() {
        this._isTransaction = true;
        return this;
    }
    /**
     * Convert data before registering data in Firestore with the results of calling a provided function(toJson)
     * @param className extends FirestoreMapper
     * @returns FirestoreAdder
     */
    mapOf(className) {
        // @ts-ignore
        this._mapper = className.toJson;
        return this;
    }
    /**
     * Firestore.collection('hoge').doc('fuga').set, merge is false. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : {
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    async set(data, options) {
        const _data = { ...data };
        const _options = {
            ...options,
            ...{ mapper: this._mapper }
        };
        const result = await repositories_1.FirestoreRepository.set({
            data: _data,
            ref: this._ref,
            isTransaction: this.isTransaction,
            ..._options,
            merge: false
        });
        return result;
    }
}
exports.FirestoreSetter = FirestoreSetter;
