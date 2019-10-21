import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../../configurations'
import { CallMutation } from '../../types'
import { callMutation } from './call-mutation'
import { FirestoreRepository } from '../../repositories'
import { Payload } from '../../models/payload.model'
import { Commit } from 'vuex'
import { SubscribeCriteriaOptions } from '../../options'

interface SubscribeCriteria<T, U> {
  statePropName: string
  state: any
  commit: Commit
  ref: T
  options?: SubscribeCriteriaOptions<U>
}

export const subscribeFirestoreCollection = <T = any>({
  statePropName,
  state,
  commit,
  ref,
  options
}: SubscribeCriteria<
  firebase.firestore.Query | firebase.firestore.CollectionReference,
  T
>) => {
  if (state[FIREX_COLLECTION_UNSUBSCRIBER]) {
    return
  }

  const mutation: CallMutation = (
    changeType: firebase.firestore.DocumentChangeType,
    payload: any
  ) => callMutation({ mutationType: 'collection', changeType, commit, payload })
  const unsubscriber = FirestoreRepository.subscribeAll({
    statePropName,
    ref,
    callMutation: mutation,
    ...options
  })

  state[FIREX_COLLECTION_UNSUBSCRIBER] = unsubscriber
}

export const subscribeFirestoreDocument = <T = any>({
  statePropName,
  state,
  commit,
  ref,
  options
}: SubscribeCriteria<firebase.firestore.DocumentReference, T>) => {
  if (state[FIREX_DOCUMENT_UNSUBSCRIBER]) {
    return
  }

  const mutation: CallMutation = (
    changeType: firebase.firestore.DocumentChangeType,
    payload: Payload
  ) => callMutation({ mutationType: 'document', changeType, commit, payload })
  const unsubscriber = FirestoreRepository.subscribe({
    statePropName,
    ref,
    callMutation: mutation,
    ...options
  })

  state[FIREX_DOCUMENT_UNSUBSCRIBER] = unsubscriber
}

/**
 * @description subscribe firestore data to state property
 * @param state vuex's state
 * @param commit vuex's commit
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - notFoundHandler
 *   - afterMutationCalled
 *   - onCompleted `deprecated`
 */
