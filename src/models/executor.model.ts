import { FirestoreRef } from '../types'
import { Commit } from 'vuex'
import { SubscribeCriteriaOptions, FindCriteriaOptions } from '../options'

interface SubscribeCriteria<T, U> {
  statePropName: string
  state: any
  commit: Commit
  options?: SubscribeCriteriaOptions<U>
}

interface FindCriteria<T, U> {
  options?: FindCriteriaOptions<U>
}

export interface Reference {
  find: <T = any>({ options }: FindCriteria<FirestoreRef, T>) => Promise<any>
  bindTo: ({ statePropName }: { statePropName: string }) => any
  subscribe: <T = any>({
    state,
    commit,
    options
  }: SubscribeCriteria<FirestoreRef, T>) => void
  unsubscribe: ({ state }: { state: any }) => void
}
