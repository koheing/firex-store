import { ActionTree } from 'vuex'
import { SubscribeOptionsParameter } from '../../parameters'
import { actionTypes } from '../types/action'
import { Subscriber } from '../../models'

interface OptionsParameter<T> extends SubscribeOptionsParameter<T> {
  /**
   * @param actionName action name registered to ActionTree
   */
  actionName?: string
}

/**
 * Subscribe firestore data to state property
 * @param firestoreSubscriber: FirestoreSubscriber instance
 * @param options: {
 *         actionName,
 *         mapper,
 *         errorHandler,
 *         notFoundHandler,
 *         completionHandler
 *         afterMutationCalled } | undefined
 * @returns ActionTree<any, any>
 *
 * @example
 *   import { firestoreSubscribeAction, FirestoreSubscriber, from } from 'firex-store'
 *   actions: {
 *     ...firestoreSubscribeAction(
 *       FirestoreSubscriber
 *         .from(firebase.firestore().collection('collection'))
 *         .bindTo('statePropName'),
 *       { actionName: 'customActionName' }
 *     ),
 *     ...firestoreSubscribeAction(
 *       from(firebase.firestore().collection('collection'))
 *         .bindTo('statePropName'),
 *       { actionName: 'customActionName2' }
 *     )
 *   }
 *
 */
export const firestoreSubscribeAction = (
  firestoreSubscriber: Subscriber,
  options?: OptionsParameter<any>
): ActionTree<any, any> => {
  const defaultActionName = firestoreSubscriber.isDocumentRef()
    ? actionTypes.document.SUBSCRIBE
    : actionTypes.collection.SUBSCRIBE

  const action =
    options && options.actionName ? options.actionName : defaultActionName

  const tree: ActionTree<any, any> = {
    [action]({ state, commit }) {
      firestoreSubscriber.subscribe(state, commit, options)
    },
  }
  return tree
}
