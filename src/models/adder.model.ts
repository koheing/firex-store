import { AppErrorOr, DocumentId } from '../types'
import { AddOptionsParameter } from '../parameters'
import { FirestoreMapper } from './firestore-mapper.model'

export interface Adder {
  readonly ref: firebase.firestore.CollectionReference
  add: <T>(
    data: any,
    options?: AddOptionsParameter<T>
  ) => Promise<AppErrorOr<DocumentId>>
  mapOf: <T extends FirestoreMapper>(className: T) => this
}
