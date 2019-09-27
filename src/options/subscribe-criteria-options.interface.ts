import { CriteriaOptions } from './criteria-options.interface'
import { AfterMutationCalled } from '../types'

export interface SubscribeCriteriaOptions<T> extends CriteriaOptions<T> {
  afterMutationCalled?: AfterMutationCalled
}
