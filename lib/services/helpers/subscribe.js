"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = require("../../configurations");
const call_mutation_1 = require("./call-mutation");
const repositories_1 = require("../../repositories");
exports.subscribeFirestoreCollection = ({ statePropName, state, commit, ref, options }) => {
    const mutation = (changeType, payload) => call_mutation_1.callMutation({ mutationType: 'collection', changeType, commit, payload });
    const unsubscribe = repositories_1.FirestoreRepository.subscribeAll({
        statePropName,
        ref,
        callMutation: mutation,
        ...options
    });
    const unsubscribes = state[configurations_1.FIREX_UNSUBSCRIBES];
    unsubscribes.set(statePropName, unsubscribe);
};
exports.subscribeFirestoreDocument = ({ statePropName, state, commit, ref, options }) => {
    const mutation = (changeType, payload) => call_mutation_1.callMutation({ mutationType: 'document', changeType, commit, payload });
    const unsubscribe = repositories_1.FirestoreRepository.subscribe({
        statePropName,
        ref,
        callMutation: mutation,
        ...options
    });
    const unsubscribes = state[configurations_1.FIREX_UNSUBSCRIBES];
    unsubscribes.set(statePropName, unsubscribe);
};
