"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriber = void 0;
const repositories_1 = require("../../repositories");
const create_mutation_1 = require("./create-mutation");
const create_mutation_handler_1 = require("./create-mutation-handler");
const asProcedure = () => {
    const subscribeFirestoreCollection = ({ statePropName, commit, ref, options, }) => {
        const { mapper, afterMutationCalled } = options;
        const callMutation = create_mutation_1.createMutation({ mutationType: 'collection', commit });
        const mutationHandler = create_mutation_handler_1.createMutationHandler().forProcedure(statePropName, callMutation, mapper, afterMutationCalled);
        const unsubscribe = repositories_1.FirestoreRepository.subscribeAll({
            ref,
            mutationHandler,
            ...options,
        });
        return unsubscribe;
    };
    const subscribeFirestoreDocument = ({ statePropName, commit, ref, options, }) => {
        const { mapper, afterMutationCalled } = options;
        const callMutation = create_mutation_1.createMutation({ mutationType: 'document', commit });
        const mutationHandler = create_mutation_handler_1.createMutationHandler().forProcedure(statePropName, callMutation, mapper, afterMutationCalled);
        const unsubscribe = repositories_1.FirestoreRepository.subscribe({
            ref,
            mutationHandler,
            ...options,
        });
        return unsubscribe;
    };
    return { subscribeFirestoreCollection, subscribeFirestoreDocument };
};
const asStream = () => {
    const subscribeFirestoreCollection = ({ commit, setUnsubscriber, actions, ref, options, }) => {
        const callMutation = create_mutation_1.createMutation({ mutationType: 'collection', commit });
        const mutationHandler = create_mutation_handler_1.createMutationHandler().forStream(callMutation, setUnsubscriber, actions);
        const unsubscribe = repositories_1.FirestoreRepository.subscribeAll({
            ref,
            mutationHandler,
            ...options,
        });
        return unsubscribe;
    };
    const subscribeFirestoreDocument = ({ commit, setUnsubscriber, actions, ref, options, }) => {
        const callMutation = create_mutation_1.createMutation({ mutationType: 'document', commit });
        const mutationHandler = create_mutation_handler_1.createMutationHandler().forStream(callMutation, setUnsubscriber, actions);
        const unsubscribe = repositories_1.FirestoreRepository.subscribe({
            ref,
            mutationHandler,
            ...options,
        });
        return unsubscribe;
    };
    return { subscribeFirestoreCollection, subscribeFirestoreDocument };
};
exports.createSubscriber = () => {
    return { asProcedure, asStream };
};
