"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = require("../configurations");
const service_1 = require("../../service");
const is_document_ref_1 = require("./is-document-ref");
const call_mutation_1 = require("./call-mutation");
const subscribeFirestoreCollection = ({ state, commit, ref, options }) => {
    if (state[configurations_1.FIREX_COLLECTION_UNSUBSCRIBER]) {
        return;
    }
    const mutation = (changeType, payload) => call_mutation_1.callMutation({ mutationType: 'collection', changeType, commit, payload });
    const unsubscriber = service_1.FirestoreService.subscribeAll({
        ref,
        callMutation: mutation,
        ...options
    });
    state[configurations_1.FIREX_COLLECTION_UNSUBSCRIBER] = unsubscriber;
};
const subscribeFirestoreDocument = ({ state, commit, ref, options }) => {
    if (state[configurations_1.FIREX_DOCUMENT_UNSUBSCRIBER]) {
        return;
    }
    const mutation = (changeType, payload) => call_mutation_1.callMutation({ mutationType: 'document', changeType, commit, payload });
    const unsubscriber = service_1.FirestoreService.subscribe({
        ref,
        callMutation: mutation,
        ...options
    });
    state[configurations_1.FIREX_DOCUMENT_UNSUBSCRIBER] = unsubscriber;
};
exports.subscribeFirestore = ({ state, commit, ref, options }) => {
    is_document_ref_1.isDocumentRef(ref)
        ? subscribeFirestoreDocument({
            state,
            commit,
            ref,
            options
        })
        : subscribeFirestoreCollection({
            state,
            commit,
            ref,
            options
        });
};
