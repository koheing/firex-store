import {
  FindCriteria,
  SubscribeCriteria,
  UnsubscribeCriteria
} from '../criterias'
import { FirestoreRef } from '../types'

export interface Reference {
  find: <T = any>({ options }: FindCriteria<FirestoreRef, T>) => Promise<any>
  bindTo: (statePropName: string) => any
  subscribe: <T = any>({
    state,
    commit,
    options
  }: SubscribeCriteria<FirestoreRef, T>) => void
  unsubscribe: ({ state, type }: UnsubscribeCriteria) => void
}
