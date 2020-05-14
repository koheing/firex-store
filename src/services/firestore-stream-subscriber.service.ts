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
  private _unsubscribe?: Unsubscribe

  /**
   * Make FirestoreSubscriber instance
   * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
   * @returns FirestoreSubscriber
   */
  static from(ref: FirestoreRef): FirestoreStreamSubscriber {
    return new FirestoreStreamSubscriber(ref)
  }

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

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

    const setUnsubscriber = (statePropName: string) => {
      const unsubscribes: Unsubscribes = state[FIREX_UNSUBSCRIBES]
      unsubscribes.set(statePropName, this._unsubscribe!)
    }

    const {
      subscribeFirestoreCollection,
      subscribeFirestoreDocument,
    } = createSubscriber().asStream()

    this._unsubscribe = isDocumentRef(this._ref)
      ? subscribeFirestoreDocument({
          commit,
          setUnsubscriber,
          ref: this._ref,
          actions: this._actions,
          options,
        })
      : subscribeFirestoreCollection({
          commit,
          setUnsubscriber,
          ref: this._ref,
          actions: this._actions,
          options,
        })
  }
}

export const bindTo = <T extends { docId: string } & Record<string, any>>(
  statePropName: string
) => tap<Context<T>>((it) => it.bindTo(statePropName)(it.data, it.isLast))

export const map = <T extends { docId: string } & Record<string, any>, U>(
  mapper: (data: T) => U
) =>
  _map<Context<T>, Context<ReturnType<typeof mapper>>>(
    ({ bindTo, data, isLast }) => {
      const _d = mapper(data)
      return { data: _d, bindTo, isLast }
    }
  )
