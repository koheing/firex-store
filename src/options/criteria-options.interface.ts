import { Mapper, ErrorHandler, CompletionHandler } from '../types'

export interface CriteriaOptions<T> {
  mapper?: Mapper<T>
  errorHandler?: ErrorHandler
  completionHandler?: CompletionHandler
}
