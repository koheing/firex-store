import { Subscriber } from '../models'
import { FirestoreRef, Unsubscribes, Unsubscribe } from '../types'
import { Commit } from 'vuex'
import { SubscribeOptionsParameter } from '../parameters'
import { errorMessageTree } from '../errors'
import {
  isDocumentRef,
  subscribeFirestoreDocument,
  subscribeFirestoreCollection
} from './helpers'
import { FIREX_UNSUBSCRIBES } from '../configurations'

/**
 * Class subscribe firestore data to state property
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
export class FirestoreSubscriber implements Subscriber {
  private _ref: FirestoreRef
  private _statePropName?: string

  /**
   * Make FirestoreSubscriber instance
   * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
   * @returns FirestoreSubscriber
   */
  static from(ref: FirestoreRef): FirestoreSubscriber {
    return new FirestoreSubscriber(ref)
  }

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

  get ref(): FirestoreRef {
    return this._ref
  }

  get statePropName(): string | undefined {
    return this._statePropName
  }

  /**
   * Set state property bound to firestore data
   * @param statePropName: string
   * @returns FirestoreSubscriber
   */
  bindTo(statePropName: string): FirestoreSubscriber {
    this._statePropName = statePropName
    return this
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
  subscribe<T = any>(
    state: any,
    commit: Commit,
    options?: SubscribeOptionsParameter<T>
  ) {
    if (!this.statePropName) {
      console.error(errorMessageTree.BIND_TO_METHOD_NOT_CALLED)
      return
    }

    if (!state[FIREX_UNSUBSCRIBES]) {
      state[FIREX_UNSUBSCRIBES] = new Map<string, Unsubscribe>()
    }

    if ((state[FIREX_UNSUBSCRIBES] as Unsubscribes).has(this.statePropName)) {
      return
    }

    isDocumentRef(this.ref)
      ? subscribeFirestoreDocument({
          statePropName: this.statePropName,
          state,
          commit,
          ref: this.ref,
          options
        })
      : subscribeFirestoreCollection({
          statePropName: this.statePropName,
          state,
          commit,
          ref: this.ref,
          options
        })
  }

  isDocumentRef(): boolean {
    return isDocumentRef(this.ref)
  }
}
