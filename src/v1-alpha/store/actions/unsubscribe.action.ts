import { ActionTree } from 'vuex'
import { actionTypes } from '../types/action'
import { FirestoreUnsubscriber } from '../../services/firestore-unsubscriber.service'

/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param options: { actionName: string } | undefined
 *
 * @example
 *   actions: {
 *     ...firestoreUnsubscribeAction(
 *       FirestoreUnsubscriber
 *         .unbind('collection'),
 *       { actionName: 'subscribeAll' }
 *     )
 *   }
 *
 */
export const firestoreUnsubscribeAction = (
  firestoreUnsubscriber: FirestoreUnsubscriber,
  options?: { actionName: string }
) => {
  const defaultActionName =
    firestoreUnsubscriber.type === 'document'
      ? actionTypes.document.UNSUBSCRIBE
      : actionTypes.collection.UNSUBSCRIBE

  const action =
    options && options.actionName ? options.actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      firestoreUnsubscriber.unsubscribe(state)
    }
  }

  return tree
}
