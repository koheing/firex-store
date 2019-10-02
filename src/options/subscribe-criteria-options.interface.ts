import { CriteriaOptions } from './criteria-options.interface'
import { AfterMutationCalled, NotFoundHandler } from '../types'

export interface SubscribeCriteriaOptions<T> extends CriteriaOptions<T> {
  /**
   * @param afterMutationCalled convert subscribed data to something, if defined
   *   - `subscribeFirestore` and `subscribeFirestoreActions` only.
   *   - type: (payload: Payload) => void
   *     - payload = { data: { docId: string, [key: string]: any }, isLast: boolean }
   */
  afterMutationCalled?: AfterMutationCalled
  /** 
  * @param notFoundHandler (type?: string, isAll?: boolean) => void
  *   - type: 'document' | 'collection'
  *   - isAll:
  *     - undefined  when subscribe Document data
  *     - true       when subscribe Collection data
  *     - false      when subscribe Collection data and document in Collection is not existed
  */
  notFoundHandler?: NotFoundHandler
}
