"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
class FirestoreMergeSetter {
    constructor(ref) {
        this._isTransaction = false;
        this._ref = ref;
    }
    static to(ref) {
        return new FirestoreMergeSetter(ref);
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
    async mergeSet(data, options) {
        const d = { ...data };
        const result = await repositories_1.FirestoreRepository.set({
            data: d,
            ref: this._ref,
            isTransaction: this.isTransaction,
            ...options,
            merge: true
        });
        return result;
    }
}
exports.FirestoreMergeSetter = FirestoreMergeSetter;
