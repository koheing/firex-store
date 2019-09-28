"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToIfDefined = (documentSnapshot, mapper) => {
    const data = { ...documentSnapshot.data() };
    const result = mapper ? mapper(data) : data;
    result.docId = documentSnapshot.id;
    return result;
};
