import { AppErrorOr } from '../types'
import { SetOptionsParameter } from '../parameters'

export interface Setter {
  readonly ref: firebase.firestore.DocumentReference
  set: <T>(
    data: any,
    options?: SetOptionsParameter<T>
  ) => Promise<AppErrorOr<void>>
}
