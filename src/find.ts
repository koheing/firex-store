import { FirestoreService } from './service'
import { FirestoreRef, NullOr } from './types'
import { isDocumentRef } from './store/helpers/is-document-ref'
import { FindCriteriaOptions } from './options'

interface FindCriteria<T, U> {
  ref: T
  options?: FindCriteriaOptions<U>
}

/**
 * @description fetch firestore data at once
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - onCompleted `deprecated`
 */
export const findFirestore = <T = any>({
  ref,
  options
}: FindCriteria<FirestoreRef, T>): Promise<NullOr<T>> => {
  return isDocumentRef(ref)
    ? FirestoreService.find<T>({ ref, ...options })
    : FirestoreService.findAll<T>({ ref, ...options })
}
