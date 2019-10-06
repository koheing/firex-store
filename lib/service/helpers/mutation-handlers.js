"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const to_document_result_1 = require("./to-document-result");
exports.callDocumentMutation = ({ snapshot, callMutation, isLast, type, mapper, afterMutationCalled }) => {
    const _type = type ? type : 'added';
    const data = to_document_result_1.toDocumentResult(snapshot, mapper);
    const payload = { data, isLast };
    callMutation(_type, payload);
    if (afterMutationCalled) {
        afterMutationCalled(payload);
    }
};
exports.callCollectionMutation = ({ snapshot, callMutation, mapper, afterMutationCalled, notifyNotFound }) => {
    const length = snapshot.docChanges().length;
    snapshot.docChanges().forEach((change, index) => {
        !change.doc.exists
            ? notifyNotFound()
            : exports.callDocumentMutation({
                snapshot: change.doc,
                callMutation,
                isLast: length === index + 1,
                type: change.type,
                mapper,
                afterMutationCalled
            });
    });
};
