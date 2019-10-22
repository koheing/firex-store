"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const repositories_1 = require("../repositories");
class FirestoreFetcher {
    constructor(ref) {
        this._ref = ref;
    }
    static where(ref) {
        return new FirestoreFetcher(ref);
    }
    get ref() {
        return this._ref;
    }
    fetch(options) {
        return helpers_1.isDocumentRef(this.ref)
            ? repositories_1.FirestoreRepository.find({ ref: this.ref, ...options })
            : repositories_1.FirestoreRepository.findAll({ ref: this.ref, ...options });
    }
}
exports.FirestoreFetcher = FirestoreFetcher;
