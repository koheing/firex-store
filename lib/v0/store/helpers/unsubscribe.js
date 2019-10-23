"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = require("../configurations");
/**
 * @description unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param state any. vuex's state
 */
exports.unsubscribeFirestore = ({ state, type }) => {
    const prop = type === 'document'
        ? configurations_1.FIREX_DOCUMENT_UNSUBSCRIBER
        : configurations_1.FIREX_COLLECTION_UNSUBSCRIBER;
    if (state[prop]) {
        state[prop]();
        delete state[prop];
    }
};
