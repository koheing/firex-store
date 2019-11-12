import { Commit } from 'vuex'
import { SubscribeOptionsParameter } from '../parameters'
import { FirestoreRef } from '../types'

export interface Subscriber {
  readonly ref: FirestoreRef
  readonly statePropName: string | undefined
  bindTo: (statePropName: string) => any
  subscribe: <T = any>(
    state: any,
    commit: Commit,
    options?: SubscribeOptionsParameter<T>
  ) => void
  isDocumentRef(): boolean
}
