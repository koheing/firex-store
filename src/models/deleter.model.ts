import { AppErrorOr } from '../types'
import { DeleteOptionsParameter } from '../parameters'

export interface Deleter {
  readonly ref: firebase.firestore.DocumentReference
  delete: (options?: DeleteOptionsParameter) => Promise<AppErrorOr<void>>
}
