"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("../types/action");
const helpers_1 = require("../helpers");
/**
 * @description subscribe firestore data to state property
 * @param actionName custom action name. can undefined
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - notFoundHandler
 *   - afterMutationCalled
 *   - onCompleted `deprecated`
 */
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
