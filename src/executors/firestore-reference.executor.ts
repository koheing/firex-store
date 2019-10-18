import { Reference } from '../models'
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

interface Criteria {
  ref: FirestoreRef
}

interface SubscribeCriteria<T> {
  statePropName: string
  state: any
  commit: Commit
  options?: SubscribeCriteriaOptions<T>
}

interface FindCriteria<T> {
  options?: FindCriteriaOptions<T>
}

export class FirestoreReferenceExecutor implements Reference {
  private ref: FirestoreRef
  private statePropName?: string

  constructor({ ref }: Criteria) {
    this.ref = ref
  }

  find<T = any>({ options }: FindCriteria<T>): Promise<any> {
    return isDocumentRef(this.ref)
      ? FirestoreService.find({ ref: this.ref, ...options })
      : FirestoreService.findAll({ ref: this.ref, ...options })
  }

  bindTo({ statePropName }: { statePropName: string }): FirestoreReferenceExecutor {
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

  unsubscribe({ state }: { state: any }) {
    const prop = isDocumentRef(this.ref)
      ? FIREX_DOCUMENT_UNSUBSCRIBER
      : FIREX_COLLECTION_UNSUBSCRIBER
    if (state[prop]) {
      state[prop]()
      delete state[prop]
    }
  }
}
