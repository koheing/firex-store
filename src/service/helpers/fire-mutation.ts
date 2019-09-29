import { Mapper, CallMutation, AfterMutationCalled } from '../../types'
import { mapToIfDefined } from './map-to-if-defined'
import { Payload } from '../../models'

interface Criteria<T, U> {
  isLast: boolean
  type: firebase.firestore.DocumentChangeType
  snapshot: T
  callMutation: CallMutation
  mapper?: Mapper<U>
  afterMutationCalled?: AfterMutationCalled
}

export const fireMutation = <U = any>({
  isLast,
  type,
  snapshot,
  callMutation,
  mapper,
  afterMutationCalled
}: Criteria<firebase.firestore.DocumentSnapshot, U>) => {
  const data = mapToIfDefined(snapshot, mapper)
  const payload: Payload = { data, isLast }

  callMutation(type, payload)

  if (afterMutationCalled) {
    afterMutationCalled(payload)
  }
}
