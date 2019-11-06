import { AppErrorOr } from '../types'
import { SetCriteriaOptions } from '../options'

export interface Setter {
  readonly ref: firebase.firestore.DocumentReference
  set: <T>(
    data: any,
    options?: SetCriteriaOptions<T>
  ) => Promise<AppErrorOr<void>>
}
