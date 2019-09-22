import { ActionTree } from 'vuex'
import { actionTypes } from '../types/action'
import { subscribeFirestore, isDocumentRef } from '../helpers'
import { CriteriaOptions } from '../../criteria-options.interface'
import { FirestoreRef } from '../../types'

interface Criteria<T = any> {
  ref: FirestoreRef
  actionName?: string
  options?: CriteriaOptions<T>
}

export const firestoreSubscribeActions = <T = any>({
  ref,
  actionName,
  options
}: Criteria<T>) => {
  const defaultActionName = isDocumentRef(ref)
    ? actionTypes.DOCUMENT_SUBSCRIBE
    : actionTypes.COLLECTION_SUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state, commit }) {
      subscribeFirestore({ state, commit, ref, options })
    }
  }
  return tree
}
