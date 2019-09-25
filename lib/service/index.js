"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class FirestoreService {
    static subscribe({ ref, fireMutation, mapper, errorHandler, onCompleted }) {
        return ref.onSnapshot((doc) => {
            if (!doc.exists) {
                return;
            }
            const payload = utils_1.mapToIfDefined(doc, mapper);
            fireMutation('added', payload);
        }, (error) => errorHandler ? errorHandler(error) : console.error(error), () => {
            if (!onCompleted) {
                return;
            }
            onCompleted();
        });
    }
    static subscribeAll({ ref, fireMutation, mapper, errorHandler, onCompleted }) {
        return ref.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (!change.doc.exists) {
                    return;
                }
                const payload = utils_1.mapToIfDefined(change.doc, mapper);
                fireMutation(change.type, payload);
            });
        }, (error) => errorHandler ? errorHandler(error) : console.error(error), () => {
            if (!onCompleted) {
                return;
            }
            onCompleted();
        });
    }
    static find({ ref, mapper, errorHandler, onCompleted }) {
        const result = ref
            .get()
            .then((doc) => {
            if (!doc.exists) {
                return;
            }
            const payload = utils_1.mapToIfDefined(doc, mapper);
            return payload;
        })
            .catch((error) => errorHandler ? errorHandler(error) : console.error(error));
        return !utils_1.isNodeV8Over()
            ? result
            : result.finally(() => {
                if (!onCompleted) {
                    return;
                }
                onCompleted();
            });
    }
    static findAll({ ref, mapper, errorHandler, onCompleted }) {
        const result = ref
            .get()
            .then((snapshot) => snapshot.docs.map((doc) => {
            if (!doc.exists) {
                return;
            }
            const payload = utils_1.mapToIfDefined(doc, mapper);
            return payload;
        }))
            .catch((error) => errorHandler ? errorHandler(error) : console.error(error));
        return !utils_1.isNodeV8Over()
            ? result
            : result.finally(() => {
                if (!onCompleted) {
                    return;
                }
                onCompleted();
            });
    }
}
exports.FirestoreService = FirestoreService;
