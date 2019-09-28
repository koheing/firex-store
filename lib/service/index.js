"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
class FirestoreService {
    static subscribe({ ref, callMutation, mapper, errorHandler, onCompleted, afterMutationCalled }) {
        return ref.onSnapshot((doc) => {
            if (!doc.exists) {
                return;
            }
            const data = helpers_1.mapToIfDefined(doc, mapper);
            const payload = { data, isLast: true };
            callMutation('added', payload);
            if (afterMutationCalled) {
                afterMutationCalled(payload);
            }
        }, (error) => errorHandler ? errorHandler(error) : console.error(error), () => {
            if (!onCompleted) {
                return;
            }
            onCompleted();
        });
    }
    static subscribeAll({ ref, callMutation, mapper, errorHandler, onCompleted, afterMutationCalled }) {
        return ref.onSnapshot((snapshot) => {
            const length = snapshot.docChanges().length;
            snapshot.docChanges().forEach((change, index) => {
                if (!change.doc.exists) {
                    return;
                }
                const data = helpers_1.mapToIfDefined(change.doc, mapper);
                const payload = { data, isLast: length === index + 1 };
                callMutation(change.type, payload);
                if (afterMutationCalled) {
                    afterMutationCalled(payload);
                }
            });
        }, (error) => errorHandler ? errorHandler(error) : console.error(error), () => {
            if (!onCompleted) {
                return;
            }
            onCompleted();
        });
    }
    static async find({ ref, mapper, errorHandler, onCompleted }) {
        const result = await ref
            .get()
            .then((doc) => (!doc.exists ? null : helpers_1.mapToIfDefined(doc, mapper)))
            .catch((error) => errorHandler ? errorHandler(error) : console.error(error));
        if (onCompleted) {
            onCompleted();
        }
        return result;
    }
    static async findAll({ ref, mapper, errorHandler, onCompleted }) {
        const result = await ref
            .get()
            .then((snapshot) => snapshot.empty
            ? []
            : snapshot.docs.map((doc) => !doc.exists ? null : helpers_1.mapToIfDefined(doc, mapper)))
            .then((documentResults) => {
            const resultWithoutNull = documentResults.filter((it) => it !== null);
            return resultWithoutNull.length > 0 ? resultWithoutNull : null;
        })
            .catch((error) => errorHandler ? errorHandler(error) : console.error(error));
        if (onCompleted) {
            onCompleted();
        }
        return result;
    }
}
exports.FirestoreService = FirestoreService;
