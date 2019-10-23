"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = require("../configurations");
/**
 * @description class unsubscribe firestore data to state property
 *
 * @example
 *   FirestoreUnsubscriber
 *     .unbind('collection')
 *     .unsubscribe(state)
 */
class FirestoreUnsubscriber {
    constructor(type) {
        this._type = type;
    }
    /**
     * @description Make FirestoreUnsubscriber instance
     * @param type: 'document' | 'collection'
     * @returns FirestoreUnsubscriber
     */
    static unbind(type) {
        return new FirestoreUnsubscriber(type);
    }
    get type() {
        return this._type;
    }
    /**
     * @description unsubscribe firestore data
     * @param state: any
     */
    unsubscribe(state) {
        const prop = this.type === 'document'
            ? configurations_1.FIREX_DOCUMENT_UNSUBSCRIBER
            : configurations_1.FIREX_COLLECTION_UNSUBSCRIBER;
        if (state[prop]) {
            state[prop]();
            delete state[prop];
        }
    }
}
exports.FirestoreUnsubscriber = FirestoreUnsubscriber;
