import { CallMutation, MutationType } from '../../types'
import { callMutation } from './call-mutation'
import { Commit } from 'vuex'
import { Payload } from '../../models'

interface MutationParameter {
  mutationType: MutationType
  commit: Commit
}

export const createMutation = ({ mutationType, commit }: MutationParameter) => (
  statePropName: string
): CallMutation => (
  changeType: firebase.firestore.DocumentChangeType,
  { isLast, data }: Omit<Payload, 'statePropName'>
) =>
  callMutation({
    mutationType,
    changeType,
    commit,
    payload: { statePropName, isLast, data },
  })
