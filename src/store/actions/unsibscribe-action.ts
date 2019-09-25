import { actionTypes } from '../types/action'
import { MutationType } from '../../types'
import { unsubscribeFirestore } from '../helpers'
import { ActionTree } from 'vuex'

interface Criteria {
  type: MutationType
  actionName?: string
}

export const firestoreUnsubscribeActions = ({
  type,
  actionName
}: Criteria): ActionTree<any, any> => {
  const defaultActionName =
    type === 'document'
      ? actionTypes.document.UNSUBSCRIBE
      : actionTypes.collection.UNSUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      unsubscribeFirestore({ state, type })
    }
  }

  return tree
}
