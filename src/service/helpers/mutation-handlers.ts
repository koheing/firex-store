import { Mapper, CallMutation, AfterMutationCalled } from '../../types'
import { toDocumentResult } from './to-document-result'
import { Payload } from '../../models'

interface DocumentCriteria<T> {
  snapshot: firebase.firestore.DocumentSnapshot
  callMutation: CallMutation
  isLast?: boolean
  type?: firebase.firestore.DocumentChangeType
  mapper?: Mapper<T>
  afterMutationCalled?: AfterMutationCalled
}

interface CollectionCriteria<T> {
  snapshot: firebase.firestore.QuerySnapshot
  callMutation: CallMutation
  notifyNotFound: () => void
  mapper?: Mapper<T>
  afterMutationCalled?: AfterMutationCalled
}

export const callDocumentMutation = <T = any>({
  snapshot,
  callMutation,
  isLast,
  type,
  mapper,
  afterMutationCalled
}: DocumentCriteria<T>) => {
  const _type = type ? type : 'added'
  const _isLast: boolean = typeof isLast !== 'undefined' ? isLast : true

  const data = toDocumentResult(snapshot, mapper)
  const payload: Payload = { data, isLast: _isLast }

  callMutation(_type, payload)

  if (afterMutationCalled) {
    afterMutationCalled(payload)
  }
}

export const callCollectionMutation = <T = any>({
  snapshot,
  callMutation,
  mapper,
  afterMutationCalled,
  notifyNotFound
}: CollectionCriteria<T>) => {
  const length = snapshot.docChanges().length
  snapshot.docChanges().forEach((change, index) => {
    !change.doc.exists
      ? notifyNotFound()
      : callDocumentMutation<T>({
          snapshot: change.doc,
          callMutation,
          isLast: length === index + 1,
          type: change.type,
          mapper,
          afterMutationCalled
        })
  })
}
