"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutation_1 = require("../types/mutation");
exports.callMutation = ({ mutationType, changeType, commit, payload }) => {
    const types = mutationType === 'document'
        ? mutation_1.mutationTypes.document
        : mutation_1.mutationTypes.collection;
    switch (changeType) {
        case 'added':
            commit(types.ADD, payload);
            break;
        case 'modified':
            commit(types.MODIFY, payload);
            break;
        default:
            commit(types.REMOVE, payload);
            break;
    }
};
