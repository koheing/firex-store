"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutation_1 = require("../types/mutation");
const documentMutations = (prop) => {
    const types = mutation_1.mutationTypes.document;
    return {
        [types.ADD](state, payload) {
            state[prop] = payload.data;
        },
        [types.MODIFY](state, payload) {
            state[prop] = payload.data;
        },
        [types.REMOVE](state) {
            state[prop] = null;
        }
    };
};
const collectionMutations = (prop) => {
    const types = mutation_1.mutationTypes.collection;
    return {
        [types.ADD](state, payload) {
            if (state[prop] == null) {
                state[prop] = [];
            }
            ;
            state[prop].push(payload.data);
        },
        [types.MODIFY](state, payload) {
            const index = state[prop].findIndex((data) => data.docId === payload.data.docId);
            if (index === -1) {
                return;
            }
            ;
            state[prop].splice(index, 1, payload.data);
        },
        [types.REMOVE](state, payload) {
            const index = state[prop].findIndex((data) => data.docId === payload.data.docId);
            if (index === -1) {
                return;
            }
            ;
            state[prop].splice(index, 1);
        }
    };
};
exports.firestoreMutations = ({ statePropName, type }) => {
    return type === 'document'
        ? documentMutations(statePropName)
        : collectionMutations(statePropName);
};
