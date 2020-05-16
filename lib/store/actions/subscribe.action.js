"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestoreSubscribeAction = void 0;
const action_1 = require("../types/action");
/**
 * Subscribe firestore data to state property
 * @param firestoreSubscriber: FirestoreSubscriber instance
 * @param options: {
 *         actionName,
 *         mapper,
 *         errorHandler,
 *         notFoundHandler,
 *         completionHandler
 *         afterMutationCalled } | undefined
 * @returns ActionTree<any, any>
 *
 * @example
 *   import { firestoreSubscribeAction, FirestoreSubscriber, from } from 'firex-store'
 *   actions: {
 *     ...firestoreSubscribeAction(
 *       FirestoreSubscriber
 *         .from(firebase.firestore().collection('collection'))
 *         .bindTo('statePropName'),
 *       { actionName: 'customActionName' }
 *     ),
 *     ...firestoreSubscribeAction(
 *       from(firebase.firestore().collection('collection'))
 *         .bindTo('statePropName'),
 *       { actionName: 'customActionName2' }
 *     )
 *   }
 *
 */
exports.firestoreSubscribeAction = (firestoreSubscriber, options) => {
    const defaultActionName = firestoreSubscriber.isDocumentRef()
        ? action_1.actionTypes.document.SUBSCRIBE
        : action_1.actionTypes.collection.SUBSCRIBE;
    const action = options && options.actionName ? options.actionName : defaultActionName;
    const tree = {
        [action]({ state, commit }) {
            firestoreSubscriber.subscribe(state, commit, options);
        },
    };
    return tree;
};
