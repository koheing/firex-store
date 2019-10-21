import { FirestoreRepository } from '../repositories'
import { FirestoreRef } from '../types'
import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../configurations'
import { NOT_CALL_BIND_TO_METHOD_YET } from '../errors'
import {
  isDocumentRef,
  subscribeFirestoreDocument,
  subscribeFirestoreCollection
} from './helpers'
import { Commit } from 'vuex'
import { SubscribeCriteriaOptions, FindCriteriaOptions } from '../options'
import { Reader } from '../models'

export class FirestoreReaderService implements Reader {
  private _ref: FirestoreRef
  private _statePropName?: string

  static from(ref: FirestoreRef): FirestoreReaderService {
    return new FirestoreReaderService(ref)
  }

  static unsubscribe(state: any, type: 'document' | 'collection') {
    const prop =
      type === 'document'
        ? FIREX_DOCUMENT_UNSUBSCRIBER
        : FIREX_COLLECTION_UNSUBSCRIBER
    if (state[prop]) {
      state[prop]()
      delete state[prop]
    }
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

  find<T = any>(options?: FindCriteriaOptions<T>): Promise<any> {
    return isDocumentRef(this.ref)
      ? FirestoreRepository.find({ ref: this.ref, ...options })
      : FirestoreRepository.findAll({ ref: this.ref, ...options })
  }

  bindTo(statePropName: string): FirestoreReaderService {
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

  unsubscribe(state: any) {
    const prop = this.isDocumentRef()
      ? FIREX_DOCUMENT_UNSUBSCRIBER
      : FIREX_COLLECTION_UNSUBSCRIBER
    if (state[prop]) {
      state[prop]()
      delete state[prop]
    }
  }

  isDocumentRef(): boolean {
    return isDocumentRef(this.ref)
  }
}
