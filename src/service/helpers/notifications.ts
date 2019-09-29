import {
  NotFoundHandler,
  MutationType,
  ErrorHandler,
  CompletionHandler
} from '../../types'

export const notifyNotFound = (
  type: MutationType,
  notFoundHandler?: NotFoundHandler,
  isAll?: boolean
) =>
  notFoundHandler ? notFoundHandler(type, isAll) : console.log('DATA NOT FOUND')

export const notifyErrorOccurred = (error: any, errorHandler?: ErrorHandler) =>
  errorHandler ? errorHandler(error) : console.error(error)

export const notifyCompletionIfDefined = (
  completionHandler?: CompletionHandler
) => {
  if (completionHandler) {
    completionHandler()
  }
}
