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
/**
 * @description subscribe firestore data to state property
 * @param state vuex's state
 * @param commit vuex's commit
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - notFoundHandler
 *   - afterMutationCalled
 *   - onCompleted `deprecated`
 */
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
