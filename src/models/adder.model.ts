import { AppErrorOr, DocumentId } from '../types'
import { AddCriteriaOptions } from '../options'

export interface Adder {
  readonly ref: firebase.firestore.CollectionReference
  add: <T>(
    data: any,
    options?: AddCriteriaOptions<T>
  ) => Promise<AppErrorOr<DocumentId>>
}
