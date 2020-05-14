import { Mapper, CallMutation, AfterMutationCalled } from '../../types'
import { toDocumentResult } from './to-document-result'
import { Payload } from '../../models'

interface DocumentParameter<T> {
  statePropName: string
  snapshot: firebase.firestore.DocumentSnapshot
  callMutation: CallMutation
  isLast?: boolean
  type?: firebase.firestore.DocumentChangeType
  mapper?: Mapper<T>
  afterMutationCalled?: AfterMutationCalled
}

interface CollectionParameter<T> {
  statePropName: string
  snapshot: firebase.firestore.QuerySnapshot
  callMutation: CallMutation
  notifyNotFound: () => void
  mapper?: Mapper<T>
  afterMutationCalled?: AfterMutationCalled
}

export const callDocumentMutation = <T = any>({
  statePropName,
  snapshot,
  callMutation,
  isLast,
  type,
  mapper,
  afterMutationCalled,
}: DocumentParameter<T>) => {
  const _type = type ? type : 'added'

  const data = toDocumentResult(snapshot, mapper)
  const payload: Payload = { data, isLast, statePropName }

  callMutation(_type, payload)

  if (afterMutationCalled) {
    afterMutationCalled(payload)
  }
}

export const callCollectionMutation = <T = any>({
  statePropName,
  snapshot,
  callMutation,
  mapper,
  afterMutationCalled,
  notifyNotFound,
}: CollectionParameter<T>) => {
  const length = snapshot.docChanges().length
  snapshot.docChanges().forEach((change, index) => {
    !change.doc.exists
      ? notifyNotFound()
      : callDocumentMutation<T>({
          statePropName,
          snapshot: change.doc,
          callMutation,
          isLast: length === index + 1,
          type: change.type,
          mapper,
          afterMutationCalled,
        })
  })
}
