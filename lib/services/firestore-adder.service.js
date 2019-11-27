"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
/**
 *  Class add data to firestore
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
 *   FirestoreAdder
 *     .to(firebase.firestore().collection('collection'))
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .add(data, {
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
     * Firestore.collection('hoge').add
     * @param data : add data to firestore
     * @param options : {
     *         errorHandler,
     *         completionHandler
     *        } | undefined
     * @returns `DocumentId(string)` or `AppError`
     */
    async add(data, options) {
        const _data = { ...data };
        const _options = {
            ...options,
            ...{ mapper: this._mapper }
        };
        const result = await repositories_1.FirestoreRepository.add({
            ref: this._ref,
            data: _data,
            ..._options
        });
        return result;
    }
}
exports.FirestoreAdder = FirestoreAdder;
