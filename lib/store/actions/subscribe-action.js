"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../types/action");
const helpers_1 = require("../helpers");
exports.firestoreSubscribeActions = ({ ref, actionName, options }) => {
    const defaultActionName = helpers_1.isDocumentRef(ref)
        ? action_1.actionTypes.document.SUBSCRIBE
        : action_1.actionTypes.collection.SUBSCRIBE;
    const action = actionName ? actionName : defaultActionName;
    const tree = {
        [action]({ state, commit }) {
            helpers_1.subscribeFirestore({ state, commit, ref, options });
        }
    };
    return tree;
};
