"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = require("../../configurations");
const call_mutation_1 = require("./call-mutation");
const repositories_1 = require("../../repositories");
exports.subscribeFirestoreCollection = ({ statePropName, state, commit, ref, options }) => {
    if (state[configurations_1.FIREX_COLLECTION_UNSUBSCRIBER]) {
        return;
    }
    const mutation = (changeType, payload) => call_mutation_1.callMutation({ mutationType: 'collection', changeType, commit, payload });
    const unsubscriber = repositories_1.FirestoreRepository.subscribeAll({
        statePropName,
        ref,
        callMutation: mutation,
        ...options
    });
    state[configurations_1.FIREX_COLLECTION_UNSUBSCRIBER] = unsubscriber;
};
exports.subscribeFirestoreDocument = ({ statePropName, state, commit, ref, options }) => {
    if (state[configurations_1.FIREX_DOCUMENT_UNSUBSCRIBER]) {
        return;
    }
    const mutation = (changeType, payload) => call_mutation_1.callMutation({ mutationType: 'document', changeType, commit, payload });
    const unsubscriber = repositories_1.FirestoreRepository.subscribe({
        statePropName,
        ref,
        callMutation: mutation,
        ...options
    });
    state[configurations_1.FIREX_DOCUMENT_UNSUBSCRIBER] = unsubscriber;
};
