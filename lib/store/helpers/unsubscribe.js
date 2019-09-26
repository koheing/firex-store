"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = require("../configurations");
exports.unsubscribeFirestore = ({ state, type }) => {
    const prop = type === 'document'
        ? configurations_1.FIREX_DOCUMENT_UNSUBSCRIBER
        : configurations_1.FIREX_COLLECTION_UNSUBSCRIBER;
    if (state[prop]) {
        state[prop]();
        delete state[prop];
    }
};
