import { Reader } from '../models'
import { FirestoreService } from '../service'
import { FirestoreRef } from '../types'
import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../store/configurations'
import { NOT_CALL_BIND_TO_METHOD_YET } from '../errors'
import { isDocumentRef } from '../store/helpers'
import {
  subscribeFirestoreDocument,
  subscribeFirestoreCollection
} from './helpers'
import { Commit } from 'vuex'
import { SubscribeCriteriaOptions, FindCriteriaOptions } from '../options'


interface SubscribeCriteria<T> {
  statePropName: string
  state: any
  commit: Commit
  options?: SubscribeCriteriaOptions<T>
}

export class FirestoreReader implements Reader {
  private ref: FirestoreRef
  private statePropName?: string

  constructor(ref: FirestoreRef) {
    this.ref = ref
  }

  find<T = any>(options?: FindCriteriaOptions<T>): Promise<any> {
    return isDocumentRef(this.ref)
      ? FirestoreService.find({ ref: this.ref, ...options })
      : FirestoreService.findAll({ ref: this.ref, ...options })
  }

  bindTo(statePropName: string): FirestoreReader {
    this.statePropName = statePropName
    return this
  }

  subscribe<T = any>({ state, commit, options }: SubscribeCriteria<T>) {
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

  unsubscribe(state:any) {
    const prop = isDocumentRef(this.ref)
      ? FIREX_DOCUMENT_UNSUBSCRIBER
      : FIREX_COLLECTION_UNSUBSCRIBER
    if (state[prop]) {
      state[prop]()
      delete state[prop]
    }
  }
}
