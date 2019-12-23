import { CallMutation, MutationType } from '../../types'
import { callMutation } from './call-mutation'
import { Commit } from 'vuex'
import { Payload } from '../../models'

interface MutationParameter {
  mutationType: MutationType
  commit: Commit
}

export const createMutation = ({
  mutationType,
  commit
}: MutationParameter): CallMutation => (
  changeType: firebase.firestore.DocumentChangeType,
  payload: Payload
) => callMutation({ mutationType, changeType, commit, payload })
