"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../types/action");
/**
 * @description subscribe firestore data to state property
 * @param firestoreSubscriber: FirestoreSubscriber instance
 * @param options: {
 *         actionName,
 *         mapper,
 *         errorHandler,
 *         notFoundHandler,
 *         completionHandler
 *         afterMutationCalled } | undefined
 *
 * @example
 *   actions: {
 *     ...firestoreSubscribeAction(
 *       FirestoreSubscriber
 *         .from(firebase.firestore().collection('/comments'))
 *         .bindTo('comments'),
 *       { actionName: 'subscribeAll' }
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
        }
    };
    return tree;
};
