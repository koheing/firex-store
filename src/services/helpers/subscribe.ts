import { FIREX_UNSUBSCRIBES } from '../../configurations'
import { Unsubscribes, Context } from '../../types'
import { FirestoreRepository } from '../../repositories'
import { Commit } from 'vuex'
import { SubscribeOptionsParameter } from '../../parameters'
import { createMutation } from './create-mutation'
import { createMutationHandler } from './create-mutation-handler'
import { Action } from 'stream-executor'

interface ProcedureParameter<T, U> {
  statePropName: string
  state: any
  commit: Commit
  ref: T
  options: SubscribeOptionsParameter<U>
}

interface StreamParameter<T> {
  commit: Commit
  ref: T
  setUnsubscriber: (statePropName: string) => void
  actions: Action<Context<any>, Context<any>>[]
  options: SubscribeOptionsParameter<any>
}

const asProcedure = () => {
  const subscribeFirestoreCollection = <T = any>({
    state,
    commit,
    ref,
    options
  }: ProcedureParameter<
    firebase.firestore.Query | firebase.firestore.CollectionReference,
    T
  >) => {
    const { mapper, afterMutationCalled } = options
    const callMutation = createMutation({ mutationType: 'collection', commit })

    const mutationHandler = createMutationHandler().forProcedure(
      state,
      callMutation,
      mapper,
      afterMutationCalled
    )

    const unsubscribe = FirestoreRepository.subscribeAll({
      ref,
      mutationHandler,
      ...options
    })

    return unsubscribe
  }

  const subscribeFirestoreDocument = <T = any>({
    state,
    commit,
    ref,
    options
  }: ProcedureParameter<firebase.firestore.DocumentReference, T>) => {
    const { mapper, afterMutationCalled } = options
    const callMutation = createMutation({ mutationType: 'document', commit })

    const mutationHandler = createMutationHandler().forProcedure(
      state,
      callMutation,
      mapper,
      afterMutationCalled
    )
    const unsubscribe = FirestoreRepository.subscribe({
      ref,
      mutationHandler,
      ...options
    })

    return unsubscribe
  }

  return { subscribeFirestoreCollection, subscribeFirestoreDocument }
}

const asStream = () => {
  const subscribeFirestoreCollection = ({
    commit,
    setUnsubscriber,
    actions,
    ref,
    options
  }: StreamParameter<
    firebase.firestore.Query | firebase.firestore.CollectionReference
  >) => {
    const callMutation = createMutation({ mutationType: 'collection', commit })

    const mutationHandler = createMutationHandler().forStream(
      callMutation,
      setUnsubscriber,
      actions
    )

    const unsubscribe = FirestoreRepository.subscribeAll({
      ref,
      mutationHandler,
      ...options
    })

    return unsubscribe
  }
  const subscribeFirestoreDocument = ({
    commit,
    setUnsubscriber,
    actions,
    ref,
    options
  }: StreamParameter<firebase.firestore.DocumentReference>) => {
    const callMutation = createMutation({ mutationType: 'document', commit })

    const mutationHandler = createMutationHandler().forStream(
      callMutation,
      setUnsubscriber,
      actions
    )

    const unsubscribe = FirestoreRepository.subscribe({
      ref,
      mutationHandler,
      ...options
    })

    return unsubscribe
  }

  return { subscribeFirestoreCollection, subscribeFirestoreDocument }
}

export const createSubscriber = () => {
  return { asProcedure, asStream }
}
