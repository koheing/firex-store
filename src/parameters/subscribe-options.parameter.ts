import { OptionsParameter } from './options.parameter'
import { AfterMutationCalled, NotFoundHandler } from '../types'

export interface SubscribeOptionsParameter<T> extends OptionsParameter<T> {
  /**
   *  AfterMutationCalled This method called after mutation called
   *   - `subscribeFirestore` and `subscribeFirestoreActions` only.
   *   @param: (payload: Payload) => void
   *     + payload = { data: { docId: string, [key: string]: any }, isLast: boolean }
   *        + data: subscribed data
   *        + statePropName: state property bound subscribe data to
   *        + isLast:
   *          + undefined: subscribed 'document' data
   *          + true: subscribed multiple data(subscribe 'collection' data), and it is last data
   *          + false: subscribed multiple data(subscribe 'collection' data), and it is not last data
   *          `UseCase`: appear and disappear loading bar when subscribe at first.
   *
   */
  afterMutationCalled?: AfterMutationCalled
  /**
   * (type?: string, isAll?: boolean) => void
   * @param type: 'document' | 'collection'
   * @param isAll:
   *     + undefined  when subscribe Document data
   *     + true       when subscribe Collection data
   *     + false      when subscribe Collection data and document in Collection is not existed
   */
  notFoundHandler?: NotFoundHandler
}
