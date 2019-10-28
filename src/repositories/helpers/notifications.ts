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
  notFoundHandler
    ? notFoundHandler(type, isAll)
    : console.log(
        type === 'document' || (type === 'collection' && isAll! === true)
          ? 'DATA NOT FOUND'
          : 'PARTIAL DATA NOT FOUND'
      )

export const notifyErrorOccurred = (
  error: any,
  errorHandler?: ErrorHandler
) => {
  const defaultErrorHandler: ErrorHandler = (error: any) => {
    console.error(error)
    return error
  }
  return errorHandler ? errorHandler(error) : defaultErrorHandler(error)
}

export const notifyCompletionIfDefined = (
  completionHandler?: CompletionHandler
) => {
  if (completionHandler) {
    completionHandler()
  }
}
