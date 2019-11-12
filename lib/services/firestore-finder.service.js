"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const repositories_1 = require("../repositories");
/**
 * Class find firestore data at once
 * @returns null | error | any
 *   - error: if you defined errorHandler, it changed any
 *
 *
 * @example
 *   FirestoreFinder
 *     .from(firebase.firestore().collection('collection'))
 *     .find({
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
class FirestoreFinder {
    constructor(ref) {
        this._ref = ref;
    }
    /**
     * Make FirestoreFinder instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreFinder
     */
    static from(ref) {
        return new FirestoreFinder(ref);
    }
    get ref() {
        return this._ref;
    }
    /**
     * Find firestore data at once
     * @param options: {
     *         mapper,
     *         errorHandler,
     *         completionHandler } | undefined
     * @returns null | error | any
     *   - error: if you defined errorHandler, it changed any
     */
    find(options) {
        return helpers_1.isDocumentRef(this.ref)
            ? repositories_1.FirestoreRepository.find({ ref: this.ref, ...options })
            : repositories_1.FirestoreRepository.findAll({ ref: this.ref, ...options });
    }
}
exports.FirestoreFinder = FirestoreFinder;
