"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_to_if_defined_1 = require("./map-to-if-defined");
exports.callDocumentMutation = ({ snapshot, callMutation, isLast, type, mapper, afterMutationCalled }) => {
    const _type = type ? type : 'added';
    const _isLast = typeof isLast !== 'undefined' ? isLast : true;
    const data = map_to_if_defined_1.mapToIfDefined(snapshot, mapper);
    const payload = { data, isLast: _isLast };
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
