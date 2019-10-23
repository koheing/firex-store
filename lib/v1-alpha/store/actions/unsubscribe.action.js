"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../types/action");
/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param options: { actionName: string } | undefined
 *
 * @example
 *   actions: {
 *     ...firestoreUnsubscribeAction(
 *       FirestoreUnsubscriber
 *         .unbind('collection'),
 *       { actionName: 'subscribeAll' }
 *     )
 *   }
 *
 */
exports.firestoreUnsubscribeAction = (firestoreUnsubscriber, options) => {
    const defaultActionName = firestoreUnsubscriber.type === 'document'
        ? action_1.actionTypes.document.UNSUBSCRIBE
        : action_1.actionTypes.collection.UNSUBSCRIBE;
    const action = options && options.actionName ? options.actionName : defaultActionName;
    const tree = {
        [action]({ state }) {
            firestoreUnsubscriber.unsubscribe(state);
        }
    };
    return tree;
};
