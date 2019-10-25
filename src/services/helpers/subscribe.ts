import { FIREX_UNSUBSCRIBERS } from '../../configurations'
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

  const unsubscribers: Unsubscribers = state[FIREX_UNSUBSCRIBERS]
  unsubscribers.set(statePropName, unsubscriber)
}

export const subscribeFirestoreDocument = <T = any>({
  statePropName,
  state,
  commit,
  ref,
  options
}: SubscribeCriteria<firebase.firestore.DocumentReference, T>) => {
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

  const unsubscribers: Map<string, any> = state[FIREX_UNSUBSCRIBERS]
  unsubscribers.set(statePropName, unsubscriber)
}
