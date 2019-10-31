import { AppErrorOr, DocumentId, FirestoreRef } from '../types'

export interface Creator {
  readonly ref: FirestoreRef
  add: <T>(data: T) => Promise<AppErrorOr<DocumentId>>
  set: <T>(data: T) => Promise<AppErrorOr<void>>
}
