import { FirestoreService } from './service'
import { CriteriaOptions } from './criteria-options.interface'
import { FirestoreRef } from './types'
import { isDocumentRef } from './store/helpers/is-document-ref'

interface Criteria<T, U> {
  ref: T
  options?: CriteriaOptions<U>
}

export const findFirestore = <T = any>({
  ref,
  options
}: Criteria<FirestoreRef, T>): Promise<T> => {
  return isDocumentRef(ref)
    ? FirestoreService.find<T>({ ref, ...options })
    : FirestoreService.findAll<T>({ ref, ...options })
}
