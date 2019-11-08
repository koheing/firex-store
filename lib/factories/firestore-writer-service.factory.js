"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const firebase = require("firebase");
const errors_1 = require("../errors");
class FirestoreWriterFactory {
    constructor(ref) {
        this._ref = ref;
    }
    newData() {
        return (this._ref instanceof firebase.firestore.DocumentReference
            ? services_1.FirestoreSetter.to(this._ref)
            : services_1.FirestoreAdder.to(this
                ._ref));
    }
    existingData() {
        return (this._ref instanceof firebase.firestore.DocumentReference
            ? services_1.FirestoreMergeSetter.to(this._ref)
            : console.error(errors_1.CANNOT_CALL_IT_IF_REF_IS_COLLECTION_REFERENCE));
    }
}
exports.FirestoreWriterFactory = FirestoreWriterFactory;
