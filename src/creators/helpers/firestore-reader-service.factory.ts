import { FirestoreRef, Context } from '../../types'
import {
  FirestoreSubscriber,
  FirestoreFinder,
  FirestoreStreamSubscriber,
} from '../../services'
import { Action } from 'stream-executor'

/**
 * Factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @method bindTo(statePropName): return FirestoreSubscriber
 * @method once: return FirestoreFinder
 * @method pipe(...args): return FirestoreStreamSubscriber
 */
export class FirestoreReaderServiceFactory {
  private _ref: FirestoreRef

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

  /**
   * Return FirestoreSubscriber instance
   * @param statePropName: state property bound to firestore data
   * @return FirestoreSubscriber
   */
  bindTo(statePropName: string): FirestoreSubscriber {
    return FirestoreSubscriber.from(this._ref).bindTo(statePropName)
  }

  /**
   * Return FirestoreFinder instance
   * @return FirestoreFinder
   */
  once(): FirestoreFinder {
    return FirestoreFinder.from(this._ref)
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
  pipe<A, B, C, D, E, F, G, H, I, J>(
    act1: Action<Context<{ docId: string } & Record<string, any>>, A>,
    act2?: Action<A, B>,
    act3?: Action<B, C>,
    act4?: Action<C, D>,
    act5?: Action<D, E>,
    act6?: Action<E, F>,
    act7?: Action<F, G>,
    act8?: Action<G, H>,
    act9?: Action<H, I>,
    act10?: Action<I, J>
  ) {
    return FirestoreStreamSubscriber.from(this._ref).pipe(
      act1,
      act2,
      act3,
      act4,
      act5,
      act6,
      act7,
      act8,
      act9,
      act10
    )
  }
}
