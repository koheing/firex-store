import { AppErrorOr } from '../types'
import { SetCriteriaOptions } from '../options'

export interface MergeSetter {
  readonly ref: firebase.firestore.DocumentReference
  mergeSet: <T>(
    data: any,
    options?: SetCriteriaOptions<T>
  ) => Promise<AppErrorOr<void>>
}
