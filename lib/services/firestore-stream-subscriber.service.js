"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = exports.bindTo = exports.FirestoreStreamSubscriber = void 0;
const configurations_1 = require("../configurations");
const utils_1 = require("../utils");
const helpers_1 = require("./helpers");
const stream_executor_1 = require("stream-executor");
class FirestoreStreamSubscriber {
    constructor(ref) {
        this._actions = [];
        this._ref = ref;
    }
    /**
     * Make FirestoreStreamSubscriber instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreStreamSubscriber
     */
    static from(ref) {
        return new FirestoreStreamSubscriber(ref);
    }
    /**
     * Subscribe firestore data like rxjs
     * @param act1 <T, U>(data: { isLast: boolean, data: T, bindTo: (statePropName: string) => void }) => U
     * @param act2 <T, U>(data: T) => U
     * @param act3 <T, U>(data: T) => U
     * @param act4 <T, U>(data: T) => U
     * @param act5 <T, U>(data: T) => U
     * @param act6 <T, U>(data: T) => U
     * @param act7 <T, U>(data: T) => U
     * @param act8 <T, U>(data: T) => U
     * @param act9 <T, U>(data: T) => U
     * @param act10 <T, U>(data: T) => U
     *
     * @example
     * import { from, map, bndTo, firestoreMutations } from 'firex-store'
     *
     * const toCharactor = (data) => ({ id: data.docId, name: `${data.first_name} ${data.family_name}` })
     *
     * export default {
     *   state: {
     *     charactors: null,
     *     isLoaded: false
     *   },
     *   mutations: {
     *     ...firestoreMutations('all'),
     *     setIsLoaded: (state, paylaod) => {
     *       state.charactors = payload
     *     }
     *   },
     *   actions: {
     *     subscribe: ({ commit, state }, { collectionName }) => {
     *       from(firebase.collections(collectionName))
     *         .pipe(
     *           map(toCharactor),
     *           bindTo('charactor'),
     *           ({ data }) => {
     *             commit('setIsLoaded', data)
     *           }
     *         )
     *         .subscribe(state, commit)
     *     }
     *   }
     * }
     */
    pipe(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10) {
        this._actions = [
            act1,
            act2,
            act3,
            act4,
            act5,
            act6,
            act7,
            act8,
            act9,
            act10,
        ].filter((it) => typeof it !== 'undefined');
        return this;
    }
    /**
     * subscribe firestore data
     * @param state Vuex's state
     * @param commit Vuex's commit
     * @param options { errorHandler, notFoundHandler, completionHandler }
     */
    subscribe(state, commit, options = {}) {
        if (!state[configurations_1.FIREX_UNSUBSCRIBES]) {
            state[configurations_1.FIREX_UNSUBSCRIBES] = new Map();
        }
        const firestoreRefType = this._isDocumentRef
            ? '[firex-store] document'
            : '[firex-store] collection';
        const createSetUnsubscriber = (state) => (statePropName) => {
            const unsubscribes = state[configurations_1.FIREX_UNSUBSCRIBES];
            unsubscribes.set(firestoreRefType, statePropName);
        };
        const { subscribeFirestoreCollection, subscribeFirestoreDocument, } = helpers_1.createSubscriber().asStream();
        const unsubscribe = utils_1.isDocumentRef(this._ref)
            ? subscribeFirestoreDocument({
                commit,
                ref: this._ref,
                setUnsubscriber: createSetUnsubscriber(state),
                actions: this._actions,
                options,
            })
            : subscribeFirestoreCollection({
                commit,
                ref: this._ref,
                setUnsubscriber: createSetUnsubscriber(state),
                actions: this._actions,
                options,
            });
        const unsubscribes = state[configurations_1.FIREX_UNSUBSCRIBES];
        const statePropName = unsubscribes.get(firestoreRefType);
        unsubscribes.set(statePropName, unsubscribe);
        unsubscribes.delete(firestoreRefType);
    }
    get _isDocumentRef() {
        return utils_1.isDocumentRef(this._ref);
    }
}
exports.FirestoreStreamSubscriber = FirestoreStreamSubscriber;
/**
 * subscribe firestore data to state property name
 * @param statePropName State property name that stores the data obtained from Firestore
 */
exports.bindTo = (statePropName) => stream_executor_1.tap((it) => it.bindTo(statePropName)(it.data, it.isLast));
/**
 * map firestore data
 * @param mapper (data: T) => U
 */
exports.map = (mapper) => stream_executor_1.map(({ bindTo, data, isLast }) => {
    const _d = mapper(data);
    return { data: _d, bindTo, isLast };
});
