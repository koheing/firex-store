import { Mapper, ErrorHandler } from '../types'

export interface TransactionParameter<T> {
  transaction: firebase.firestore.Transaction
  data: any
  ref: firebase.firestore.DocumentReference
  merge: boolean
  mapper?: Mapper<T>
  errorHandler?: ErrorHandler
}
