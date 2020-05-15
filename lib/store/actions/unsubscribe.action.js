"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestoreUnsubscribeAction = void 0;
const action_1 = require("../types/action");
/**
 * Unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param parameter: { type: 'document' | 'collection', actionName?: string }
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
exports.firestoreUnsubscribeAction = (firestoreUnsubscriber, parameter) => {
    const defaultActionName = parameter.type === 'document'
        ? action_1.actionTypes.document.UNSUBSCRIBE
        : action_1.actionTypes.collection.UNSUBSCRIBE;
    const action = parameter && parameter.actionName ? parameter.actionName : defaultActionName;
    const tree = {
        [action]({ state }) {
            firestoreUnsubscriber.unsubscribe(state);
        },
    };
    return tree;
};
