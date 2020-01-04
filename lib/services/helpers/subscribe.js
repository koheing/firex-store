"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = require("../../configurations");
const repositories_1 = require("../../repositories");
const create_mutation_1 = require("./create-mutation");
exports.subscribeFirestoreCollection = ({ statePropName, state, commit, ref, options }) => {
    const callMutation = create_mutation_1.createMutation({ mutationType: 'collection', commit });
    const unsubscribe = repositories_1.FirestoreRepository.subscribeAll({
        statePropName,
        ref,
        callMutation,
        ...options
    });
    const unsubscribes = state[configurations_1.FIREX_UNSUBSCRIBES];
    unsubscribes.set(statePropName, unsubscribe);
};
exports.subscribeFirestoreDocument = ({ statePropName, state, commit, ref, options }) => {
    const callMutation = create_mutation_1.createMutation({ mutationType: 'document', commit });
    const unsubscribe = repositories_1.FirestoreRepository.subscribe({
        statePropName,
        ref,
        callMutation,
        ...options
    });
    const unsubscribes = state[configurations_1.FIREX_UNSUBSCRIBES];
    unsubscribes.set(statePropName, unsubscribe);
};
