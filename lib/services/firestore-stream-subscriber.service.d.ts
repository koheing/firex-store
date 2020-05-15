import { FirestoreRef, Context } from '../types';
import { Commit } from 'vuex';
import { SubscribeOptionsParameter } from '../parameters';
import { Action } from 'stream-executor';
export declare class FirestoreStreamSubscriber {
    private _ref;
    private _actions;
    /**
     * Make FirestoreStreamSubscriber instance
     * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
     * @returns FirestoreStreamSubscriber
     */
    static from(ref: FirestoreRef): FirestoreStreamSubscriber;
    constructor(ref: FirestoreRef);
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
    pipe<A, B, C, D, E, F, G, H, I, J>(act1: Action<Context<{
        docId: string;
    } & Record<string, any>>, A>, act2?: Action<A, B>, act3?: Action<B, C>, act4?: Action<C, D>, act5?: Action<D, E>, act6?: Action<E, F>, act7?: Action<F, G>, act8?: Action<G, H>, act9?: Action<H, I>, act10?: Action<I, J>): Pick<this, "subscribe">;
    /**
     * subscribe firestore data
     * @param state Vuex's state
     * @param commit Vuex's commit
     * @param options { errorHandler, notFoundHandler, completionHandler }
     */
    subscribe(state: Record<string, any>, commit: Commit, options?: Pick<SubscribeOptionsParameter<any>, 'errorHandler' | 'notFoundHandler' | 'completionHandler'>): void;
    private get _isDocumentRef();
}
/**
 * subscribe firestore data to state property name
 * @param statePropName State property name that stores the data obtained from Firestore
 */
export declare const bindTo: <T extends Record<string, any>>(statePropName: string) => (data: Context<T>) => Context<T>;
/**
 * map firestore data
 * @param mapper (data: T) => U
 */
export declare const map: <T extends Record<string, any>, U>(mapper: (data: T) => U) => (data: Context<T>) => Context<U>;
