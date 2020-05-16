import { actionTypes } from '../types/action'
import { MutationType } from '../../types'
import { unsubscribeFirestore } from '../helpers'
import { ActionTree } from 'vuex'

interface Criteria {
  type: MutationType
  actionName?: string
}

/**
 * @warn It is deprecated. It will be removed at `^1.0.0~`
 *  unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param actionName can undefined. But if you define actionName in `firestoreSubscribeActions`, set same name.
 */
export const firestoreUnsubscribeActions = ({
  type,
  actionName,
}: Criteria): ActionTree<any, any> => {
  const defaultActionName =
    type === 'document'
      ? actionTypes.document.UNSUBSCRIBE
      : actionTypes.collection.UNSUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      unsubscribeFirestore({ state, type })
    },
  }

  return tree
}

/**
 *  unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param actionName can undefined. But if you define actionName in `firestoreSubscribeAction`, set same name.
 */
export const firestoreUnsubscribeAction = ({
  type,
  actionName,
}: Criteria): ActionTree<any, any> => {
  const defaultActionName =
    type === 'document'
      ? actionTypes.document.UNSUBSCRIBE
      : actionTypes.collection.UNSUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state }) {
      unsubscribeFirestore({ state, type })
    },
  }

  return tree
}
