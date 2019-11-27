"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
/**
 * Delegator class that convert data subscribed from Firestore.
 * @example
 * class Model implements SubscribeData {
 *   static fromJson(data: { [key: string]: any }) {
 *     return new Model()
 *   }
 * }
 */
class FirestoreMapper {
    /**
     * Mapper that converts data subscribed from Firestore
     * @param data  { [key: string]: any }
     * @returns any
     * @example
     * class Model implements SubscribeData {
     *   id: string
     *   firstName: string
     *   familyName: string
     *
     *   static fromJson(data: { [key: string]: any }): Model {
     *     return {
     *       id: data.id,
     *       firstName: data.first_name,
     *       familyName: data.family_name
     *     } as Model
     *   }
     *
     *   constructor(data: Partial<Model> = {}) {
     *     this.id = data.id || ''
     *     this.firstName = data.firstName || ''
     *     this.familyName = data.familyName || ''
     *   }
     * }
     */
    static fromJson(data) {
        throw errors_1.appErrorTree.NOT_IMPLEMENTED;
    }
}
exports.FirestoreMapper = FirestoreMapper;
