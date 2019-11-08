"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
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
    async add(data, options) {
        const d = { ...data };
        const result = await repositories_1.FirestoreRepository.add({
            ref: this._ref,
            data: d,
            ...options
        });
        return result;
    }
}
exports.FirestoreAdder = FirestoreAdder;
