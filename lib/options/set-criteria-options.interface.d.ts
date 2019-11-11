import { CriteriaOptions } from './criteria-options.interface';
import { Mapper } from '../types';
export interface SetCriteriaOptions<T> extends CriteriaOptions<T> {
    /**
     * @param mapper convert data which set to firestore to something, if defined
     *   - type: <T>(data: { [key: string]: any }) => T
     */
    mapper?: Mapper<T>;
}
