import { ActionTree } from 'vuex'
import { actionTypes } from '../types/action'
import { FirestoreUnsubscriber } from '../../services/firestore-unsubscriber.service'

export const firestoreUnsubscribeAction = (
  unsubscriber: FirestoreUnsubscriber,
  actionName?: string
) => {
  const defaultActionName =
    unsubscriber.type === 'document'
      ? actionTypes.document.UNSUBSCRIBE
      : actionTypes.collection.UNSUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      unsubscriber.unsubscribe(state)
    }
  }

  return tree
}
