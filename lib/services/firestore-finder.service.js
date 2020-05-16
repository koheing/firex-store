"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreFinder = void 0;
const utils_1 = require("../utils");
const repositories_1 = require("../repositories");
/**
 * Class find firestore data at once
 * @returns null | error | any
 *   - error: if you defined errorHandler, it changed any
 *
 *
 * @example
 *   class FirestoreMapperModel extends FirestoreMapper {
 *     id: number
 *     name: string
 *     static fromJson(data: { [key: string]: any }) {
 *        return { id: data.id, name: data.name } as FirestoreMapperModel
 *     }
 *   }
 *
 *   FirestoreFinder
 *     .from(firebase.firestore().collection('collection'))
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .find({
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
     * Convert new data with the results of calling a provided function(fromJson)
     * @param className extends FirestoreMapper
     * @returns FirestoreFinder
     */
    mapOf(className) {
        // @ts-ignore
        this._mapper = className.fromJson;
        return this;
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
        const _options = {
            ...options,
            ...{ mapper: this._mapper },
        };
        return utils_1.isDocumentRef(this.ref)
            ? repositories_1.FirestoreRepository.find({ ref: this.ref, ..._options })
            : repositories_1.FirestoreRepository.findAll({ ref: this.ref, ..._options });
    }
}
exports.FirestoreFinder = FirestoreFinder;
