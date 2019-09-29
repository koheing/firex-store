import {
  Mapper,
  ErrorHandler,
  CompletionHandler,
  NotFoundHandler
} from '../types'

export interface CriteriaOptions<T> {
  mapper?: Mapper<T>
  errorHandler?: ErrorHandler
  completionHandler?: CompletionHandler
  notFoundHandler?: NotFoundHandler
}
