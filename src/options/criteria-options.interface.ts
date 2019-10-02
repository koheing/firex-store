import { Mapper, ErrorHandler, CompletionHandler, OnCompleted } from '../types'

export interface CriteriaOptions<T> {
  /**
   * @param mapper convert subscribed data to something, if defined
   *   - type: <T>(data: { [key: string]: any }) => T
   */
  mapper?: Mapper<T>
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
  /**
   * @param onCompleted it is called when completed fetching data , if defined.
   * @warning Deprecated. It is removed on v1.0.0~. So, use `completionHandler`, please
   *   - type: () => void
   */
  onCompleted?: OnCompleted
}
