import { AppErrorOr } from '../types'
import { SetOptionsParameter } from '../parameters'

export interface MergeSetter {
  readonly ref: firebase.firestore.DocumentReference
  mergeSet: <T>(
    data: any,
    options?: SetOptionsParameter<T>
  ) => Promise<AppErrorOr<void>>
}
