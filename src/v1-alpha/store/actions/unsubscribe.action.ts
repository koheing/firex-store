import { ActionTree } from 'vuex'
import { FirestoreReaderService } from '../../services'
import { actionTypes } from '../types/action'

export const firestoreUnsubscribeAction = (
  type: 'document' | 'collection',
  actionName?: string
) => {
  const defaultActionName =
    type === 'document'
      ? actionTypes.document.UNSUBSCRIBE
      : actionTypes.collection.UNSUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      FirestoreReaderService.unsubscribe(state, type)
    }
  }

  return tree
}
