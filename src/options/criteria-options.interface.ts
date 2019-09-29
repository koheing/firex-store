import { Mapper, ErrorHandler, OnCompleted, OnDataNotFound } from '../types'

export interface CriteriaOptions<T> {
  mapper?: Mapper<T>
  errorHandler?: ErrorHandler
  onCompleted?: OnCompleted
  onDataNotFound?: OnDataNotFound
}
