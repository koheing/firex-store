import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../../configurations'
import { CallMutation, Unsubscribers } from '../../types'
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
  if (!state[FIREX_COLLECTION_UNSUBSCRIBER]) {
    state[FIREX_COLLECTION_UNSUBSCRIBER] = new Map<string, any>()
  }

  if ((state[FIREX_COLLECTION_UNSUBSCRIBER] as Unsubscribers).has(statePropName)) {
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

  const unsubscribers: Unsubscribers = state[FIREX_COLLECTION_UNSUBSCRIBER]
  unsubscribers.set(statePropName, unsubscriber)
}

export const subscribeFirestoreDocument = <T = any>({
  statePropName,
  state,
  commit,
  ref,
  options
}: SubscribeCriteria<firebase.firestore.DocumentReference, T>) => {
  if (!state[FIREX_DOCUMENT_UNSUBSCRIBER]) {
    state[FIREX_DOCUMENT_UNSUBSCRIBER] = new Map<string, any>()
  }

  if ((state[FIREX_DOCUMENT_UNSUBSCRIBER] as Unsubscribers).has(statePropName)) {
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

  const unsubscribers: Unsubscribers = state[FIREX_DOCUMENT_UNSUBSCRIBER]
  unsubscribers.set(statePropName, unsubscriber)
}
