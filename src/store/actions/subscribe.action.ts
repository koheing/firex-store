import { ActionTree } from 'vuex'
import { SubscribeCriteriaOptions } from '../../options'
import { actionTypes } from '../types/action'
import { FirestoreSubscriber } from '../../services/firestore-subscriber.service'

interface CriteriaOptions<T> extends SubscribeCriteriaOptions<T> {
  /**
   * @param actionName action name registered to ActionTree
   */
  actionName?: string
}

/**
 * @description subscribe firestore data to state property
 * @param firestoreSubscriber: FirestoreSubscriber instance
 * @param options: {
 *         actionName,
 *         mapper,
 *         errorHandler,
 *         notFoundHandler,
 *         completionHandler
 *         afterMutationCalled } | undefined
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
export const firestoreSubscribeAction = (
  firestoreSubscriber: FirestoreSubscriber,
  options?: CriteriaOptions<any>
): ActionTree<any, any> => {
  const defaultActionName = firestoreSubscriber.isDocumentRef()
    ? actionTypes.document.SUBSCRIBE
    : actionTypes.collection.SUBSCRIBE

  const action =
    options && options.actionName ? options.actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state, commit }) {
      firestoreSubscriber.subscribe(state, commit, options)
    }
  }
  return tree
}