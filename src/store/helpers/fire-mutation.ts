import { Commit } from 'vuex'
import { mutationTypes } from '../types/mutation'
import { MutationType } from '../../types'
import { Payload } from '../../models'

interface Criteria {
  mutationType: MutationType
  changeType: firebase.firestore.DocumentChangeType
  commit: Commit
  payload: Payload
}

export const fireMutation = ({
  mutationType,
  changeType,
  commit,
  payload
}: Criteria) => {
  const types =
    mutationType === 'document'
      ? mutationTypes.document
      : mutationTypes.collection
  switch (changeType) {
    case 'added':
      commit(types.ADD, payload.data)
      break
    case 'modified':
      commit(types.MODIFY, payload.data)
      break
    default:
      commit(types.REMOVE, payload.data)
      break
  }
}
