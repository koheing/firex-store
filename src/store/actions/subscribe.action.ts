import { ActionTree } from 'vuex'
import { SubscribeCriteriaOptions } from '../../options'
import { FirestoreReader } from '../helpers'
import { actionTypes } from '../types/action'

interface CriteriaOptions<T> extends SubscribeCriteriaOptions<T> {
  actionName?: string
}

export const firestoreSubscribeAction = (
  firestoreReader: FirestoreReader,
  {
    actionName,
    afterMutationCalled,
    completionHandler,
    errorHandler,
    notFoundHandler,
    mapper,
    onCompleted
  }: CriteriaOptions<any>
): ActionTree<any, any> => {
  const defaultActionName = firestoreReader.isDocumentRef()
    ? actionTypes.document.SUBSCRIBE
    : actionTypes.collection.SUBSCRIBE

  const action = actionName ? actionName : defaultActionName

  const options = {
    afterMutationCalled,
    completionHandler,
    errorHandler,
    notFoundHandler,
    mapper,
    onCompleted
  }

  const tree: ActionTree<any, any> = {
    [action]({ state, commit }) {
      firestoreReader.subscribe(state, commit, options)
    }
  }
  return tree
}
