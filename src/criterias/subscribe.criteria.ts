import { Commit } from 'vuex/types/index'
import { SubscribeCriteriaOptions } from '../options'

export interface SubscribeCriteria<T, U> {
  state: any
  commit: Commit
  ref: T
  options?: SubscribeCriteriaOptions<U>
}
