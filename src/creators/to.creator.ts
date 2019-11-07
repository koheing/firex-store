import { FirestoreWriterFactory } from '../factories'
import { DocumentOrCollection } from '../types'

export const to = <T extends DocumentOrCollection>(ref: T) =>
  new FirestoreWriterFactory<T>(ref)
