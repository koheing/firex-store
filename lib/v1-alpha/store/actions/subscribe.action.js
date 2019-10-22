"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../types/action");
exports.firestoreSubscribeAction = (subscriber, options) => {
    const defaultActionName = subscriber.isDocumentRef()
        ? action_1.actionTypes.document.SUBSCRIBE
        : action_1.actionTypes.collection.SUBSCRIBE;
    const action = options && options.actionName ? options.actionName : defaultActionName;
    const tree = {
        [action]({ state, commit }) {
            subscriber.subscribe(state, commit, options);
        }
    };
    return tree;
};
