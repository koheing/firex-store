"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreRepository = void 0;
const helpers_1 = require("./helpers");
const utils_1 = require("../utils");
class FirestoreRepository {
    static subscribe({ ref, mutationHandler, errorHandler, completionHandler, notFoundHandler, }) {
        return ref.onSnapshot((snapshot) => !snapshot.exists
            ? helpers_1.notifyNotFound('document', notFoundHandler)
            : mutationHandler({ ...snapshot.data(), docId: snapshot.id }, 'added', true), (error) => helpers_1.notifyErrorOccurred(error, errorHandler), () => helpers_1.notifyCompletionIfDefined(completionHandler));
    }
    static subscribeAll({ ref, mutationHandler, errorHandler, completionHandler, notFoundHandler, }) {
        return ref.onSnapshot((snapshot) => {
            if (snapshot.empty) {
                helpers_1.notifyNotFound('collection', notFoundHandler, true);
                return;
            }
            const docChanges = snapshot.docChanges();
            const docCount = docChanges.length;
            docChanges.forEach((it, index) => {
                mutationHandler({ ...it.doc.data(), docId: it.doc.id }, it.type, docCount === index + 1);
            });
        }, (error) => helpers_1.notifyErrorOccurred(error, errorHandler), () => helpers_1.notifyCompletionIfDefined(completionHandler));
    }
    static async subscribeOnce({ statePropName, ref, callMutation, mapper, errorHandler, completionHandler, afterMutationCalled, notFoundHandler, }) {
        const result = utils_1.isDocumentRef(ref)
            ? await this.find({
                ref,
                mapper,
                errorHandler,
            })
            : await this.findAll({
                ref,
                mapper,
                errorHandler,
            });
        if (result instanceof Error) {
            return result;
        }
        if (result === null) {
            const isArray = !utils_1.isDocumentRef(ref);
            const _type = isArray ? 'collection' : 'document';
            helpers_1.notifyNotFound(_type, notFoundHandler, isArray);
            return result;
        }
        const payload = { data: result, statePropName, isLast: true };
        callMutation('added', payload);
        if (afterMutationCalled) {
            afterMutationCalled(payload);
        }
        if (completionHandler) {
            completionHandler();
        }
        return result;
    }
    static async find({ ref, mapper, errorHandler, completionHandler, }) {
        const result = await ref
            .get()
            .then((doc) => (!doc.exists ? null : helpers_1.toDocumentResult(doc, mapper)))
            .catch((error) => helpers_1.notifyErrorOccurred(error, errorHandler));
        helpers_1.notifyCompletionIfDefined(completionHandler);
        return result;
    }
    static async findAll({ ref, mapper, errorHandler, completionHandler, }) {
        const result = await ref
            .get()
            .then((snapshot) => snapshot.empty
            ? []
            : snapshot.docs.map((doc) => !doc.exists ? null : helpers_1.toDocumentResult(doc, mapper)))
            .then((documentResults) => {
            const resultsWithoutNull = documentResults.filter((it) => it !== null);
            return resultsWithoutNull.length > 0 ? resultsWithoutNull : null;
        })
            .catch((error) => helpers_1.notifyErrorOccurred(error, errorHandler));
        helpers_1.notifyCompletionIfDefined(completionHandler);
        return result;
    }
    static async add({ data, ref, mapper, errorHandler, completionHandler, }) {
        const _data = mapper ? mapper(data) : data;
        const result = await ref
            .add(_data)
            .then((it) => it.id)
            .catch((error) => helpers_1.notifyErrorOccurred(error, errorHandler));
        helpers_1.notifyCompletionIfDefined(completionHandler);
        return result;
    }
    static async set({ data, ref, merge, isTransaction, mapper, errorHandler, completionHandler, }) {
        const _data = mapper ? mapper(data) : data;
        const result = !isTransaction
            ? await ref
                .set(_data, { merge })
                .catch((error) => helpers_1.notifyErrorOccurred(error, errorHandler))
            : await ref.firestore.runTransaction(async (transaction) => await helpers_1.transactionOfSetOrMergeSet({
                transaction,
                data: _data,
                ref,
                merge,
                mapper,
                errorHandler,
            }));
        helpers_1.notifyCompletionIfDefined(completionHandler);
        return result;
    }
    static async delete({ ref, isTransaction, errorHandler, completionHandler, }) {
        const result = !isTransaction
            ? await ref
                .delete()
                .catch((error) => helpers_1.notifyErrorOccurred(error, errorHandler))
            : await ref.firestore.runTransaction(async (transaction) => await helpers_1.transacitonOfDelete({
                ref,
                transaction,
                errorHandler,
            }));
        helpers_1.notifyCompletionIfDefined(completionHandler);
        return result;
    }
}
exports.FirestoreRepository = FirestoreRepository;
