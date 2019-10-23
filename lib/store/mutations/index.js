"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutation_1 = require("../types/mutation");
const documentMutations = () => {
    const types = mutation_1.mutationTypes.document;
    return {
        [types.ADD](state, payload) {
            const prop = payload.statePropName;
            state[prop] = payload.data;
        },
        [types.MODIFY](state, payload) {
            const prop = payload.statePropName;
            state[prop] = payload.data;
        },
        [types.REMOVE](state, payload) {
            const prop = payload.statePropName;
            state[prop] = null;
        }
    };
};
const collectionMutations = () => {
    const types = mutation_1.mutationTypes.collection;
    return {
        [types.ADD](state, payload) {
            const prop = payload.statePropName;
            if (state[prop] == null) {
                state[prop] = [];
            }
            ;
            state[prop].push(payload.data);
        },
        [types.MODIFY](state, payload) {
            const prop = payload.statePropName;
            const index = state[prop].findIndex((data) => data.docId === payload.data.docId);
            if (index === -1) {
                return;
            }
            ;
            state[prop].splice(index, 1, payload.data);
        },
        [types.REMOVE](state, payload) {
            const prop = payload.statePropName;
            const index = state[prop].findIndex((data) => data.docId === payload.data.docId);
            if (index === -1) {
                return;
            }
            ;
            state[prop].splice(index, 1);
        }
    };
};
exports.firestoreMutations = (type) => {
    switch (type) {
        case 'document':
            return { ...documentMutations() };
        case 'collection':
            return { ...collectionMutations() };
        default:
            return {
                ...documentMutations(),
                ...collectionMutations()
            };
    }
};
