"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
class FirestoreService {
    static subscribe({ ref, callMutation, mapper, errorHandler, completionHandler, afterMutationCalled, notFoundHandler, onCompleted }) {
        return ref.onSnapshot((doc) => !doc.exists
            ? helpers_1.notifyNotFound('document', notFoundHandler)
            : helpers_1.callDocumentMutation({
                snapshot: doc,
                callMutation,
                mapper,
                afterMutationCalled
            }), (error) => helpers_1.notifyErrorOccurred(error, errorHandler), () => helpers_1.notifyCompletionIfDefined(completionHandler ? completionHandler : onCompleted));
    }
    static subscribeAll({ ref, callMutation, mapper, errorHandler, completionHandler, afterMutationCalled, notFoundHandler, onCompleted }) {
        return ref.onSnapshot((snapshot) => snapshot.empty
            ? helpers_1.notifyNotFound('collection', notFoundHandler, true)
            : helpers_1.callCollectionMutation({
                snapshot,
                callMutation,
                mapper,
                afterMutationCalled,
                notifyNotFound: () => helpers_1.notifyNotFound('collection', notFoundHandler, false)
            }), (error) => helpers_1.notifyErrorOccurred(error, errorHandler), () => helpers_1.notifyCompletionIfDefined(completionHandler ? completionHandler : onCompleted));
    }
    static async find({ ref, mapper, errorHandler, completionHandler, onCompleted }) {
        const result = await ref
            .get()
            .then((doc) => (!doc.exists ? null : helpers_1.mapToIfDefined(doc, mapper)))
            .catch((error) => helpers_1.notifyErrorOccurred(error, errorHandler));
        helpers_1.notifyCompletionIfDefined(completionHandler ? completionHandler : onCompleted);
        return result;
    }
    static async findAll({ ref, mapper, errorHandler, completionHandler, onCompleted }) {
        const result = await ref
            .get()
            .then((snapshot) => snapshot.empty
            ? []
            : snapshot.docs.map((doc) => !doc.exists ? null : helpers_1.mapToIfDefined(doc, mapper)))
            .then((documentResults) => {
            const resultsWithoutNull = documentResults.filter((it) => it !== null);
            return resultsWithoutNull.length > 0 ? resultsWithoutNull : null;
        })
            .catch((error) => helpers_1.notifyErrorOccurred(error, errorHandler));
        helpers_1.notifyCompletionIfDefined(completionHandler ? completionHandler : onCompleted);
        return result;
    }
}
exports.FirestoreService = FirestoreService;
