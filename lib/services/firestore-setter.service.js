"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
/**
 * @description class set data to firestore
 *
 * @example
 *   FirestoreSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .set(data, {
 *         mapper,
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
     * @description Make FirestoreSetter instance
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
     * @description Call this if you wouldn't like to overwrite data
     * @return  `FirestoreSetter class instance`
     */
    transaction() {
        this._isTransaction = true;
        return this;
    }
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
    async set(data, options) {
        const _data = { ...data };
        const result = await repositories_1.FirestoreRepository.set({
            data: _data,
            ref: this._ref,
            isTransaction: this.isTransaction,
            ...options,
            merge: false
        });
        return result;
    }
}
exports.FirestoreSetter = FirestoreSetter;
