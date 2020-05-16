import { ActionTree } from 'vuex'
import { actionTypes } from '../types/action'
import { Unsubscriber } from '../../models'

/**
 * Unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param parameter: { type: 'document' | 'collection', actionName?: string }
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
  firestoreUnsubscriber: Unsubscriber,
  parameter: { type: 'document' | 'collection'; actionName?: string }
) => {
  const defaultActionName =
    parameter.type === 'document'
      ? actionTypes.document.UNSUBSCRIBE
      : actionTypes.collection.UNSUBSCRIBE

  const action =
    parameter && parameter.actionName ? parameter.actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      firestoreUnsubscriber.unsubscribe(state)
    },
  }

  return tree
}
