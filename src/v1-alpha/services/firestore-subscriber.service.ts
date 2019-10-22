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

export class FirestoreSubscriber implements Subscribe {
  private _ref: FirestoreRef
  private _statePropName?: string

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

  bindTo(statePropName: string): FirestoreSubscriber {
    this._statePropName = statePropName
    return this
  }

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
