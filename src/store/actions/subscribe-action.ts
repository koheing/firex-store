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

/**
 * @warn It is deprecated. It will be removed at `^1.0.0~`
 * @description subscribe firestore data to state property
 * @param actionName custom action name. can undefined
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - notFoundHandler
 *   - afterMutationCalled
 *   - onCompleted `deprecated`
 */
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

/**
 * @description subscribe firestore data to state property
 * @param actionName custom action name. can undefined
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - notFoundHandler
 *   - afterMutationCalled
 *   - onCompleted `deprecated`
 */
export const firestoreSubscribeAction = <T = any>({
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
