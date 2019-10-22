"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../types/action");
/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param actionName: string | undefined
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
exports.firestoreUnsubscribeAction = (firestoreUnsubscriber, actionName) => {
    const defaultActionName = firestoreUnsubscriber.type === 'document'
        ? action_1.actionTypes.document.UNSUBSCRIBE
        : action_1.actionTypes.collection.UNSUBSCRIBE;
    const action = actionName ? actionName : defaultActionName;
    const tree = {
        [action]({ state }) {
            firestoreUnsubscriber.unsubscribe(state);
        }
    };
    return tree;
};
