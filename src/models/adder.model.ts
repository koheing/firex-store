import { AppErrorOr, DocumentId } from '../types'
import { AddOptionsParameter } from '../parameters'

export interface Adder {
  readonly ref: firebase.firestore.CollectionReference
  add: <T>(
    data: any,
    options?: AddOptionsParameter<T>
  ) => Promise<AppErrorOr<DocumentId>>
}
