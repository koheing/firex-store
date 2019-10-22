import { ActionTree } from 'vuex'
import { SubscribeCriteriaOptions } from '../../options'
import { actionTypes } from '../types/action'
import { FirestoreSubscriber } from '../../services/firestore-subscriber.service'

interface CriteriaOptions<T> extends SubscribeCriteriaOptions<T> {
  actionName?: string
}

export const firestoreSubscribeAction = (
  subscriber: FirestoreSubscriber,
  options?: CriteriaOptions<any>
): ActionTree<any, any> => {
  const defaultActionName = subscriber.isDocumentRef()
    ? actionTypes.document.SUBSCRIBE
    : actionTypes.collection.SUBSCRIBE

  const action =
    options && options.actionName ? options.actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state, commit }) {
      subscriber.subscribe(state, commit, options)
    }
  }
  return tree
}
