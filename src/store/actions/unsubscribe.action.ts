import { ActionTree } from 'vuex'
import { actionTypes } from '../types/action'
import { FirestoreUnsubscriber } from '../../services/firestore-unsubscriber.service'

/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param criteria: { type: 'document' | 'collection', actionName?: string }
 * @returns ActionTree<any, any>
 *
 * @example
 *   import { firestoreUnsubscribeAction, FirestoreUnsubscriber, on } from 'firex-store'
 *
 *   actions: {
 *     ...firestoreUnsubscribeAction(
 *       FirestoreUnsubscriber
 *         .on('statePropName'),
 *       { type: 'collection', actionName: 'customActionName' }
 *     ),
 *     ....firestoreUnsubscribeAction(
 *       on('statePropName'),
 *       { type: 'collection', actionName: 'customActionName2' }
 *     )
 *   }
 *
 */
export const firestoreUnsubscribeAction = (
  firestoreUnsubscriber: FirestoreUnsubscriber,
  criteria: { type: 'document' | 'collection'; actionName?: string }
) => {
  const defaultActionName =
    criteria.type === 'document'
      ? actionTypes.document.UNSUBSCRIBE
      : actionTypes.collection.UNSUBSCRIBE

  const action =
    criteria && criteria.actionName ? criteria.actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      firestoreUnsubscriber.unsubscribe(state)
    }
  }

  return tree
}
