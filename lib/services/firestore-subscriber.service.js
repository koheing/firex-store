"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const helpers_1 = require("./helpers");
const configurations_1 = require("../configurations");
const is_document_ref_1 = require("../utils/is-document-ref");
const repositories_1 = require("../repositories");
/**
 * Class subscribe firestore data to state property
 *
 * @example
 *    class FirestoreMapperModel extends FirestoreMapper {
 *     id: number
 *     name: string
 *     static fromJson(data: { [key: string]: any }) {
 *        return { id: data.id, name: data.name } as FirestoreMapperModel
 *     }
 *   }
 *
 *   FirestoreSubscriber
 *     .from(firebase.firestore().collection('collection'))
 *     .bindTo('statePropName')
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .subscribe(state, commit, {
 *         errorHandler,
 *         notFoundHandler,
 *         afterMutationCalled
 *     })
 *
 *   FirestoreSubscriber
 *     .from(firebase.firestore().collection('collection'))
 *     .bindTo('statePropName')
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .subscribeOnce(commit, {
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
     * Make FirestoreSubscriber instance
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
     * Set state property bound to firestore data
     * @param statePropName: string
     * @returns FirestoreSubscriber
     */
    bindTo(statePropName) {
        this._statePropName = statePropName;
        return this;
    }
    /**
     * Convert new data with the results of calling a provided function(fromJson)
     * @param className extends FirestoreMapper
     * @returns FirestoreSubscriber
     */
    mapOf(className) {
        // @ts-ignore
        this._mapper = className.fromJson;
        return this;
    }
    /**
     * Subscribe firestore data and bind to state property
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
            console.error(errors_1.errorMessageTree.BIND_TO_METHOD_NOT_CALLED);
            return;
        }
        if (!state[configurations_1.FIREX_UNSUBSCRIBES]) {
            state[configurations_1.FIREX_UNSUBSCRIBES] = new Map();
        }
        if (state[configurations_1.FIREX_UNSUBSCRIBES].has(this.statePropName)) {
            return;
        }
        const _options = {
            ...options,
            ...{ mapper: this._mapper }
        };
        is_document_ref_1.isDocumentRef(this.ref)
            ? helpers_1.subscribeFirestoreDocument({
                statePropName: this.statePropName,
                state,
                commit,
                ref: this.ref,
                options: _options
            })
            : helpers_1.subscribeFirestoreCollection({
                statePropName: this.statePropName,
                state,
                commit,
                ref: this.ref,
                options: _options
            });
    }
    /**
     * Subscribe firestore data and bind to state property at once
     * @param commit: Commit
     * @param options: { mapper,
     *         errorHandler,
     *         notFoundHandler,
     *         completionHandler
     *         afterMutationCalled } | undefined
     */
    async subscribeOnce(commit, options) {
        if (!this.statePropName) {
            console.error(errors_1.errorMessageTree.BIND_TO_METHOD_NOT_CALLED);
            return;
        }
        const _options = {
            ...options,
            ...{ mapper: this._mapper }
        };
        const mutationType = 'document';
        const callMutation = helpers_1.createMutation({ mutationType, commit });
        await repositories_1.FirestoreRepository.subscribeOnce({
            statePropName: this.statePropName,
            ref: this.ref,
            callMutation,
            ..._options
        });
    }
    isDocumentRef() {
        return is_document_ref_1.isDocumentRef(this.ref);
    }
}
exports.FirestoreSubscriber = FirestoreSubscriber;
