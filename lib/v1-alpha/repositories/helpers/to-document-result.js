"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDocumentResult = (snapshot, mapper) => {
    const data = { ...snapshot.data() };
    const result = mapper ? mapper(data) : data;
    result.docId = snapshot.id;
    return result;
};
