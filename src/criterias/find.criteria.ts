import { FindCriteriaOptions } from '../options'

export interface FindCriteria<T, U> {
  ref: T
  options?: FindCriteriaOptions<U>
}
