"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
/**
 * facade of FirestoreSetter and FirestoreMergeSetter
 * @param ref: firebase.firestore.DocumentReference
 * @method transaction: Call it if you wanna transaction
 * @method set: Firestore.set, merge is false
 * @method mergeSet: Firestore.set, merge is true
 */
class FirestoreDocumentWriterFacade {
    constructor(ref) {
        this._isTransaction = false;
        this._ref = ref;
    }
    get ref() {
        return this._ref;
    }
    get isTransaction() {
        return this._isTransaction;
    }
    /**
     * Call it if you wanna transaction
     * @return `FirestoreDocumentWriterFacade class instance`
     */
    transaction() {
        this._isTransaction = true;
        return this;
    }
    /**
     * Convert data before registering data in Firestoren with the results of calling a provided function(toJson)
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
        const _options = {
            ...options,
            ...{ mapper: this._mapper }
        };
        return this._isTransaction
            ? services_1.FirestoreSetter.to(this._ref)
                .transaction()
                .set(data, _options)
            : services_1.FirestoreSetter.to(this._ref).set(data, _options);
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
        const _options = {
            ...options,
            ...{ mapper: this._mapper }
        };
        return this._isTransaction
            ? services_1.FirestoreMergeSetter.to(this._ref)
                .transaction()
                .mergeSet(data, _options)
            : services_1.FirestoreMergeSetter.to(this._ref).mergeSet(data, _options);
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
        return this._isTransaction
            ? services_1.FirestoreDeleter.to(this._ref)
                .transaction()
                .delete(options)
            : services_1.FirestoreDeleter.to(this._ref).delete();
    }
}
exports.FirestoreDocumentWriterFacade = FirestoreDocumentWriterFacade;
