"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationTypes = void 0;
const documentTypes = {
    ADD: '[firex-store] Add',
    MODIFY: '[firex-store] Modify',
    REMOVE: '[firex-store] Remove',
};
const collectionTypes = {
    ADD: '[firex-store] Add Array',
    MODIFY: '[firex-store] Modify Array',
    REMOVE: '[firex-store] Remove Array',
};
exports.mutationTypes = {
    document: documentTypes,
    collection: collectionTypes,
};
