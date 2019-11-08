"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
class FirestoreSetter {
    constructor(ref) {
        this._isTransaction = false;
        this._ref = ref;
    }
    static to(ref) {
        return new FirestoreSetter(ref);
    }
    get ref() {
        return this._ref;
    }
    get isTransaction() {
        return this._isTransaction;
    }
    transaction() {
        this._isTransaction = true;
        return this;
    }
    async set(data, options) {
        const d = { ...data };
        const result = await repositories_1.FirestoreRepository.set({
            data: d,
            ref: this._ref,
            isTransaction: this.isTransaction,
            ...options,
            merge: false
        });
        return result;
    }
}
exports.FirestoreSetter = FirestoreSetter;
