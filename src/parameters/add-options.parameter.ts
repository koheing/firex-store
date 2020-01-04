import { OptionsParameter } from './options.parameter'
import { Mapper } from '../types'

export interface AddOptionsParameter<T> extends OptionsParameter<T> {
  /**
   * @param mapper convert data which set to firestore to something, if defined
   * @deprecated it will be removed at ^2.0.0~. Use FirestoreMapper, please.
   *   - type: <T>(data: { [key: string]: any }) => T
   */
  mapper?: Mapper<T>
}
