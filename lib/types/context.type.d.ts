export interface Context<T> extends Record<string, any> {
    /**
     * Firestore data.
     * Data form, after subscribe, is { docId: string } & Record<string, any>
     */
    data: T;
    /**
     * In subscribing document data, it is always `true`.
     * In subscribing collection data and collection has 3 data,
     *   No1, No2 data: `false`, No3 data: `true`
     */
    isLast: boolean;
    /**
     * bind to Vuex state.
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
     *           ({ bindTo, data, isLast }) => bindTo('charactors')(data,isLast),
     *         )
     *         .subscribe(state, commit)
     *     }
     *   }
     * }
     */
    bindTo: (statePropName: string) => (data: Record<string, any>, isLast: boolean) => void;
}
