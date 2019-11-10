"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
/**
 * @description class add data to firestore
 *
 * @example
 *   FirestoreAdder
 *     .to(firebase.firestore().collection('collection'))
 *     .add(data, {
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
class FirestoreAdder {
    constructor(ref) {
        this._ref = ref;
    }
    static to(ref) {
        return new FirestoreAdder(ref);
    }
    get ref() {
        return this._ref;
    }
    /**
     * @description Firestore.collection('hoge').add
     * @param data : add data to firestore
     * @param options : {
     *         mapper,
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `DocumentId(string)` or `AppError`
     */
    async add(data, options) {
        const _data = { ...data };
        const result = await repositories_1.FirestoreRepository.add({
            ref: this._ref,
            data: _data,
            ...options
        });
        return result;
    }
}
exports.FirestoreAdder = FirestoreAdder;
