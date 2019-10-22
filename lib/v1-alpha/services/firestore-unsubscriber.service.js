"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = require("../configurations");
class FirestoreUnsubscriber {
    constructor(type) {
        this._type = type;
    }
    static unbind(type) {
        return new FirestoreUnsubscriber(type);
    }
    get type() {
        return this._type;
    }
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
