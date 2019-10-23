import { Subscribe } from '../models'
import { FirestoreRef } from '../types'
import { Commit } from 'vuex'
import { SubscribeCriteriaOptions } from '../options'
import { NOT_CALL_BIND_TO_METHOD_YET } from '../errors'
import {
  isDocumentRef,
  subscribeFirestoreDocument,
  subscribeFirestoreCollection
} from './helpers'

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
export class FirestoreSubscriber implements Subscribe {
  private _ref: FirestoreRef
  private _statePropName?: string

  /**
   * @description Make FirestoreSubscriber instance
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
   * @description Set state property bound to firestore data
   * @param statePropName: string
   * @returns FirestoreSubscriber
   */
  bindTo(statePropName: string): FirestoreSubscriber {
    this._statePropName = statePropName
    return this
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
  subscribe<T = any>(
    state: any,
    commit: Commit,
    options?: SubscribeCriteriaOptions<T>
  ) {
    if (!this.statePropName) {
      console.error(NOT_CALL_BIND_TO_METHOD_YET)
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
