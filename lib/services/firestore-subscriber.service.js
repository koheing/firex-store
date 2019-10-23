"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const helpers_1 = require("./helpers");
/**
 * @description class subscribe firestore data to state property
 *
 * @example
 *   FirestoreSubscriber
 *     .from(firebase.firestore().collection('collection'))
 *     .bindTo('statePropName')
 *     .subscribe(state, commit, {
 *         mapper,
 *         errorHandler,
 *         notFoundHandler,
 *         afterMutationCalled
 *     })
 */
class FirestoreSubscriber {
    constructor(ref) {
        this._ref = ref;
    }
    /**
     * @description Make FirestoreSubscriber instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreSubscriber
     */
    static from(ref) {
        return new FirestoreSubscriber(ref);
    }
    get ref() {
        return this._ref;
    }
    get statePropName() {
        return this._statePropName;
    }
    /**
     * @description Set state property bound to firestore data
     * @param statePropName: string
     * @returns FirestoreSubscriber
     */
    bindTo(statePropName) {
        this._statePropName = statePropName;
        return this;
    }
    /**
     * @description subscribe firestore data and bind to state property
     * @param state: any
     * @param commit: Commit
     * @param options: { mapper,
     *         errorHandler,
     *         notFoundHandler,
     *         completionHandler
     *         afterMutationCalled } | undefined
     */
    subscribe(state, commit, options) {
        if (!this.statePropName) {
            console.error(errors_1.NOT_CALL_BIND_TO_METHOD_YET);
            return;
        }
        helpers_1.isDocumentRef(this.ref)
            ? helpers_1.subscribeFirestoreDocument({
                statePropName: this.statePropName,
                state,
                commit,
                ref: this.ref,
                options
            })
            : helpers_1.subscribeFirestoreCollection({
                statePropName: this.statePropName,
                state,
                commit,
                ref: this.ref,
                options
            });
    }
    isDocumentRef() {
        return helpers_1.isDocumentRef(this.ref);
    }
}
exports.FirestoreSubscriber = FirestoreSubscriber;
