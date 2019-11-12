import { OptionsParameter } from './options.parameter'
import { Mapper } from '../types'

export interface SetOptionsParameter<T> extends OptionsParameter<T> {
  /**
   * @param mapper convert data which set to firestore to something, if defined
   *   - type: <T>(data: { [key: string]: any }) => T
   */
  mapper?: Mapper<T>
}
