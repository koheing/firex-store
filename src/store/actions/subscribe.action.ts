import { ActionTree } from 'vuex'
import { SubscribeCriteriaOptions } from '../../options'
import { FirestoreReaderService } from '../../services'
import { actionTypes } from '../types/action'

interface CriteriaOptions<T> extends SubscribeCriteriaOptions<T> {
  actionName?: string
}

export const firestoreSubscribeAction = (
  firestoreReaderService: FirestoreReaderService,
  options?: CriteriaOptions<any>
): ActionTree<any, any> => {
  const defaultActionName = firestoreReaderService.isDocumentRef()
    ? actionTypes.document.SUBSCRIBE
    : actionTypes.collection.SUBSCRIBE

  const action = options && options.actionName ? options.actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state, commit }) {
      firestoreReaderService.subscribe(state, commit, options)
    }
  }
  return tree
}
