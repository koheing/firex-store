"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
/**
 * @description class merge set data to firestore
 *
 * @example
 *   FirestoreMergeSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .mergeSet(data, {
 *         mapper,
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
     * @description Make FirestoreMergeSetter instance
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
     * @description Call this if you wanna use transaction
     * @return `FirestoreMergeSetter class instance`
     */
    transaction() {
        this._isTransaction = true;
        return this;
    }
    /**
     * @description Firestore.collection('hoge').doc('fuga').set, merge is true. call `transaction` before call it, if you wanna transaction
     * @param data : Set data to firestore
     * @param options : {
     *         mapper,
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    async mergeSet(data, options) {
        const _data = { ...data };
        const result = await repositories_1.FirestoreRepository.set({
            data: _data,
            ref: this._ref,
            isTransaction: this.isTransaction,
            ...options,
            merge: true
        });
        return result;
    }
}
exports.FirestoreMergeSetter = FirestoreMergeSetter;
