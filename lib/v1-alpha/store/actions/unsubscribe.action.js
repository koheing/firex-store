"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../types/action");
exports.firestoreUnsubscribeAction = (unsubscriber, actionName) => {
    const defaultActionName = unsubscriber.type === 'document'
        ? action_1.actionTypes.document.UNSUBSCRIBE
        : action_1.actionTypes.collection.UNSUBSCRIBE;
    const action = actionName ? actionName : defaultActionName;
    const tree = {
        [action]({ state }) {
            unsubscriber.unsubscribe(state);
        }
    };
    return tree;
};
