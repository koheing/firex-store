import { actionTypes } from '../types/action'
import { MutationType } from '../../types'
import { unsubscribeFirestore } from '../helpers'
import { ActionTree } from 'vuex'

interface Criteria {
  type: MutationType
  actionName?: string
}

export const firestoreUnsubscribeActions = ({ type, actionName }: Criteria) => {
  const defaultActionName =
    type === 'document'
      ? actionTypes.DOCUMENT_UNSUBSCRIBE
      : actionTypes.COLLECTION_UNSUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      unsubscribeFirestore({ state, type })
    }
  }

  return tree
}
