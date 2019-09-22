import { Mapper, ErrorHandler, OnCompleted } from './types'

export interface CriteriaOptions<T> {
  mapper?: Mapper<T>
  errorHandler?: ErrorHandler
  onCompleted?: OnCompleted
}
