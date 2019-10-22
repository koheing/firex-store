import { ActionTree } from 'vuex'
import { actionTypes } from '../types/action'
import { FirestoreUnsubscriber } from '../../services/firestore-unsubscriber.service'

/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param actionName: string | undefined
 *
 * @example
 *   actions: {
 *     ...firestoreSubscribeAction(
 *       FirestoreSubscriber
 *         .from(firebase.firestore().collection('/comments'))
 *         .bindTo('comments'),
 *       { actionName: 'subscribeAll' }
 *     )
 *   }
 *
 */
export const firestoreUnsubscribeAction = (
  firestoreUnsubscriber: FirestoreUnsubscriber,
  actionName?: string
) => {
  const defaultActionName =
    firestoreUnsubscriber.type === 'document'
      ? actionTypes.document.UNSUBSCRIBE
      : actionTypes.collection.UNSUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      firestoreUnsubscriber.unsubscribe(state)
    }
  }

  return tree
}
