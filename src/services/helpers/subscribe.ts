import { FIREX_UNSUBSCRIBES } from '../../configurations'
import { CallMutation, Unsubscribes } from '../../types'
import { callMutation } from './call-mutation'
import { FirestoreRepository } from '../../repositories'
import { Payload } from '../../models/payload.model'
import { Commit } from 'vuex'
import { SubscribeOptionsParameter } from '../../parameters'
import { createMutation } from './create-mutation'

interface SubscribeParameter<T, U> {
  statePropName: string
  state: any
  commit: Commit
  ref: T
  options?: SubscribeOptionsParameter<U>
}

export const subscribeFirestoreCollection = <T = any>({
  statePropName,
  state,
  commit,
  ref,
  options
}: SubscribeParameter<
  firebase.firestore.Query | firebase.firestore.CollectionReference,
  T
>) => {
  const callMutation = createMutation({ mutationType: 'collection', commit })
  const unsubscribe = FirestoreRepository.subscribeAll({
    statePropName,
    ref,
    callMutation,
    ...options
  })

  const unsubscribes: Unsubscribes = state[FIREX_UNSUBSCRIBES]
  unsubscribes.set(statePropName, unsubscribe)
}

export const subscribeFirestoreDocument = <T = any>({
  statePropName,
  state,
  commit,
  ref,
  options
}: SubscribeParameter<firebase.firestore.DocumentReference, T>) => {
  const callMutation = createMutation({ mutationType: 'document', commit })
  const unsubscribe = FirestoreRepository.subscribe({
    statePropName,
    ref,
    callMutation,
    ...options
  })

  const unsubscribes: Unsubscribes = state[FIREX_UNSUBSCRIBES]
  unsubscribes.set(statePropName, unsubscribe)
}
