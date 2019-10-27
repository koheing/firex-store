"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../types/action");
/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param criteria: { type: 'document' | 'collection', actionName?: string }
 *
 * @example
 *   actions: {
 *     ...firestoreUnsubscribeAction(
 *       FirestoreUnsubscriber
 *         .unbind('comments'),
 *       { type: 'collection', actionName: 'subscribeAll' }
 *     )
 *   }
 *
 */
exports.firestoreUnsubscribeAction = (firestoreUnsubscriber, criteria) => {
    const defaultActionName = criteria.type === 'document'
        ? action_1.actionTypes.document.UNSUBSCRIBE
        : action_1.actionTypes.collection.UNSUBSCRIBE;
    const action = criteria && criteria.actionName ? criteria.actionName : defaultActionName;
    const tree = {
        [action]({ state }) {
            firestoreUnsubscriber.unsubscribe(state);
        }
    };
    return tree;
};
