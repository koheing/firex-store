"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../types/action");
/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param criteria: { type: 'document' | 'collection', actionName?: string }
 * @returns ActionTree<any, any>
 *
 * @example
 *   import { firestoreUnsubscribeAction, FirestoreUnsubscriber, on } from 'firex-store'
 *
 *   actions: {
 *     ...firestoreUnsubscribeAction(
 *       FirestoreUnsubscriber
 *         .on('statePropName'),
 *       { type: 'collection', actionName: 'customActionName' }
 *     ),
 *     ....firestoreUnsubscribeAction(
 *       on('statePropName'),
 *       { type: 'collection', actionName: 'customActionName2' }
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
