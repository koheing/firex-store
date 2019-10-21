import { Commit } from 'vuex'
import { SubscribeCriteriaOptions, FindCriteriaOptions } from '../options'

export interface Reader {
  find: <T = any>(options?: FindCriteriaOptions<T>) => Promise<any>
  bindTo: (statePropName: string) => any
  subscribe: <T = any>(
    state: any,
    commit: Commit,
    options?: SubscribeCriteriaOptions<T>
  ) => void
  unsubscribe: (state: any) => void
}
