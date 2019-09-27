import { ActionTree } from 'vuex'
import { actionTypes } from '../types/action'
import { subscribeFirestore, isDocumentRef } from '../helpers'
import { SubscribeCriteriaOptions } from '../../options'
import { FirestoreRef } from '../../types'

interface Criteria<T = any> {
  ref: FirestoreRef
  actionName?: string
  options?: SubscribeCriteriaOptions<T>
}

export const firestoreSubscribeActions = <T = any>({
  ref,
  actionName,
  options
}: Criteria<T>): ActionTree<any, any> => {
  const defaultActionName = isDocumentRef(ref)
    ? actionTypes.document.SUBSCRIBE
    : actionTypes.collection.SUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state, commit }) {
      subscribeFirestore({ state, commit, ref, options })
    }
  }
  return tree
}
