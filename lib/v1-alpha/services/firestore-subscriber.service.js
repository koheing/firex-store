"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const helpers_1 = require("./helpers");
class FirestoreSubscriber {
    constructor(ref) {
        this._ref = ref;
    }
    static from(ref) {
        return new FirestoreSubscriber(ref);
    }
    get ref() {
        return this._ref;
    }
    get statePropName() {
        return this._statePropName;
    }
    bindTo(statePropName) {
        this._statePropName = statePropName;
        return this;
    }
    subscribe(state, commit, options) {
        if (!this.statePropName) {
            console.error(errors_1.NOT_CALL_BIND_TO_METHOD_YET);
            return;
        }
        helpers_1.isDocumentRef(this.ref)
            ? helpers_1.subscribeFirestoreDocument({
                statePropName: this.statePropName,
                state,
                commit,
                ref: this.ref,
                options
            })
            : helpers_1.subscribeFirestoreCollection({
                statePropName: this.statePropName,
                state,
                commit,
                ref: this.ref,
                options
            });
    }
    isDocumentRef() {
        return helpers_1.isDocumentRef(this.ref);
    }
}
exports.FirestoreSubscriber = FirestoreSubscriber;
