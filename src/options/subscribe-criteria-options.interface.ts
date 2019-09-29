import { CriteriaOptions } from './criteria-options.interface'
import { AfterMutationCalled, NotFoundHandler } from '../types'

export interface SubscribeCriteriaOptions<T> extends CriteriaOptions<T> {
  afterMutationCalled?: AfterMutationCalled
  notFoundHandler?: NotFoundHandler
}
