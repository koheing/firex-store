import { FIREX_UNSUBSCRIBES } from '../../configurations'
import { CallMutation, Unsubscribes } from '../../types'
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
  const unsubscribe = FirestoreRepository.subscribeAll({
    statePropName,
    ref,
    callMutation: mutation,
    ...options
  })

  const unsubscribers: Unsubscribes = state[FIREX_UNSUBSCRIBES]
  unsubscribers.set(statePropName, unsubscribe)
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
  const unsubscribe = FirestoreRepository.subscribe({
    statePropName,
    ref,
    callMutation: mutation,
    ...options
  })

  const unsubscribes: Unsubscribes = state[FIREX_UNSUBSCRIBES]
  unsubscribes.set(statePropName, unsubscribe)
}
