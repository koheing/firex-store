import { FirestoreRef } from '../types'
import { Commit } from 'vuex'
import { SubscribeCriteriaOptions, FindCriteriaOptions } from '../options'

interface SubscribeCriteria<T, U> {
  statePropName: string
  state: any
  commit: Commit
  options?: SubscribeCriteriaOptions<U>
}

export interface Reader {
  find: <T = any>(options?: FindCriteriaOptions<T>) => Promise<any>
  bindTo: (statePropName: string) => any
  subscribe: <T = any>({
    state,
    commit,
    options
  }: SubscribeCriteria<FirestoreRef, T>) => void
  unsubscribe: (state: any) => void
}
