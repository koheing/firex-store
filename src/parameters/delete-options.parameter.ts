import { ErrorHandler, CompletionHandler } from '../types'

export interface DeleteOptionsParameter {
  /**
   * @param errorHandler it is called when error occured, if defined. But if not, call `console.error(error)`
   *   - type: (error: any) => any
   */
  errorHandler?: ErrorHandler
  /**
   * @param completionHandler it is called when completed fetching data , if defined.
   *   - type: () => void
   */
  completionHandler?: CompletionHandler
}
