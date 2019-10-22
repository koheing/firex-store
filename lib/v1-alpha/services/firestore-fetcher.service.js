"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const repositories_1 = require("../repositories");
/**
 * @description class fetch firestore data at once
 *
 * @example
 *   FirestoreFetcher
 *     .where(firebase.firestore().collection('collection'))
 *     .fetch({
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
class FirestoreFetcher {
    constructor(ref) {
        this._ref = ref;
    }
    /**
     * @description Make FirestoreFetcher instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreFetcher
     */
    static where(ref) {
        return new FirestoreFetcher(ref);
    }
    get ref() {
        return this._ref;
    }
    /**
     * @description fetch firestore data at once
     * @param options: { mapper,
     *         errorHandler,
     *         completionHandler } | undefined
     */
    fetch(options) {
        return helpers_1.isDocumentRef(this.ref)
            ? repositories_1.FirestoreRepository.find({ ref: this.ref, ...options })
            : repositories_1.FirestoreRepository.findAll({ ref: this.ref, ...options });
    }
}
exports.FirestoreFetcher = FirestoreFetcher;
