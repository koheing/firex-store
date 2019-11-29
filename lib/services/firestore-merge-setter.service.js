"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
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
class FirestoreMergeSetter {
    constructor(ref) {
        this._isTransaction = false;
        this._ref = ref;
    }
    /**
     *  Make FirestoreMergeSetter instance
     * @param ref: firebase.firestore.DocumentReference
     * @returns FirestoreMergeSetter
     */
    static to(ref) {
        return new FirestoreMergeSetter(ref);
    }
    get ref() {
        return this._ref;
    }
    get isTransaction() {
        return this._isTransaction;
    }
    /**
     * Call this if you wanna use transaction
     * @return `FirestoreMergeSetter class instance`
     */
    transaction() {
        this._isTransaction = true;
        return this;
    }
    /**
     * Convert data before registering data in Firestore with the results of calling a provided function(toJson)
     * @param className extends FirestoreMapper
     * @returns FirestoreMergeSetter
     */
    mapOf(className) {
        // @ts-ignore
        this._mapper = className.toJson;
        return this;
    }
    /**
     * Firestore.collection('hoge').doc('fuga').set, merge is true. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : {
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    async mergeSet(data, options) {
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
            merge: true
        });
        return result;
    }
}
exports.FirestoreMergeSetter = FirestoreMergeSetter;
