import { FirestoreRef, Unsubscribe, Context, Unsubscribes } from '../types'
import { Commit } from 'vuex'
import { FIREX_UNSUBSCRIBES } from '../configurations'
import { isDocumentRef } from '../utils'
import { createSubscriber } from './helpers'
import { SubscribeOptionsParameter } from '../parameters'
import { tap, Action, map as _map } from 'stream-executor'

export class FirestoreStreamSubscriber {
  private _ref: FirestoreRef
  private _actions: Action<any, any>[] = []

  /**
   * Make FirestoreStreamSubscriber instance
   * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
   * @returns FirestoreStreamSubscriber
   */
  static from(ref: FirestoreRef): FirestoreStreamSubscriber {
    return new FirestoreStreamSubscriber(ref)
  }

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

  /**
   * Subscribe firestore data like rxjs
   * @description please see a comparison of usage with `from(ref).bindTo(statePropName)`
   *  https://github.com/nor-ko-hi-jp/firex-store/blob/master/docs/v1/v1-usage.md#subscribe-firestore-using-like-rxjs
   * @description If you'd like to use helper method in pipe function, use stream-executor library.
   *  https://github.com/nor-ko-hi-jp/stream-executor#helper-methods-and-those-descriptions-in-createstream-are
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
    ].filter((it) => typeof it !== 'undefined') as Action<any, any>[]

    return this as Pick<this, 'subscribe'>
  }

  /**
   * subscribe firestore data
   * @param state Vuex's state
   * @param commit Vuex's commit
   * @param options { errorHandler, notFoundHandler, completionHandler }
   */
  subscribe(
    state: Record<string, any>,
    commit: Commit,
    options: Pick<
      SubscribeOptionsParameter<any>,
      'errorHandler' | 'notFoundHandler' | 'completionHandler'
    > = {}
  ) {
    if (!state[FIREX_UNSUBSCRIBES]) {
      state[FIREX_UNSUBSCRIBES] = new Map<string, Unsubscribe>()
    }

    const firestoreRefType = this._isDocumentRef
      ? '[firex-store] document'
      : '[firex-store] collection'
    const createSetUnsubscriber = (state: any) => (statePropName: string) => {
      const unsubscribes: Unsubscribes = state[FIREX_UNSUBSCRIBES]
      unsubscribes.set(firestoreRefType, statePropName)
    }

    const {
      subscribeFirestoreCollection,
      subscribeFirestoreDocument,
    } = createSubscriber().asStream()

    const unsubscribe = isDocumentRef(this._ref)
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
        })

    const unsubscribes: Unsubscribes = state[FIREX_UNSUBSCRIBES]
    const statePropName = unsubscribes.get(firestoreRefType) as string
    unsubscribes.set(statePropName, unsubscribe)
    unsubscribes.delete(firestoreRefType)
  }

  private get _isDocumentRef(): boolean {
    return isDocumentRef(this._ref)
  }
}

/**
 * subscribe firestore data to state property name
 * @param statePropName State property name that stores the data obtained from Firestore
 */
export const bindTo = <T extends Record<string, any>>(statePropName: string) =>
  tap<Context<T>>((it) => it.bindTo(statePropName)(it.data, it.isLast))

/**
 * map firestore data
 * @param mapper (data: T) => U
 */
export const map = <T extends Record<string, any>, U>(mapper: (data: T) => U) =>
  _map<Context<T>, Context<ReturnType<typeof mapper>>>(
    ({ bindTo, data, isLast }) => {
      const _d = mapper(data)
      return { data: _d, bindTo, isLast }
    }
  )
