"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
/**
 * Class delete firestore data
 *
 * @example
 *   FirestoreDeleter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .delete({ errorHandler, completionHandler })
 */
class FirestoreDeleter {
    constructor(ref) {
        this._isTransaction = false;
        this._ref = ref;
    }
    /**
     * Make FirestoreDeleter instance
     * @param ref: firebase.firestore.DocumentReference
     * @returns FirestoreDeleter
     */
    static to(ref) {
        return new FirestoreDeleter(ref);
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
     * Firestore.collection('hoge').doc('fuga').delete. call `transaction` before call it, if you wanna transaction
     * @param options : {
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `AppError` or `undefined`
     */
    async delete(options) {
        const result = await repositories_1.FirestoreRepository.delete({
            ref: this._ref,
            isTransaction: this._isTransaction,
            ...options
        });
        return result;
    }
}
exports.FirestoreDeleter = FirestoreDeleter;
