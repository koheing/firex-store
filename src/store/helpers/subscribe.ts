import { Commit } from 'vuex'
import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../configurations'
import { FirestoreService } from '../../service'
import { FirestoreRef, CallMutation } from '../../types'
import { SubscribeCriteriaOptions } from '../../options'
import { isDocumentRef } from './is-document-ref'
import { callMutation } from './call-mutation'
import { Payload } from '../../models'

interface Criteria<T, U> {
  state: any
  commit: Commit
  ref: T
  options?: SubscribeCriteriaOptions<U>
}

const subscribeFirestoreCollection = <T = any>({
  state,
  commit,
  ref,
  options
}: Criteria<
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
  const unsubscriber = FirestoreService.subscribeAll({
    ref,
    callMutation: mutation,
    ...options
  })

  state[FIREX_COLLECTION_UNSUBSCRIBER] = unsubscriber
}

const subscribeFirestoreDocument = <T = any>({
  state,
  commit,
  ref,
  options
}: Criteria<firebase.firestore.DocumentReference, T>) => {
  if (state[FIREX_DOCUMENT_UNSUBSCRIBER]) {
    return
  }

  const mutation: CallMutation = (
    changeType: firebase.firestore.DocumentChangeType,
    payload: Payload
  ) => callMutation({ mutationType: 'document', changeType, commit, payload })
  const unsubscriber = FirestoreService.subscribe({
    ref,
    callMutation: mutation,
    ...options
  })

  state[FIREX_DOCUMENT_UNSUBSCRIBER] = unsubscriber
}

export const subscribeFirestore = <T = any>({
  state,
  commit,
  ref,
  options
}: Criteria<FirestoreRef, T>) => {
  isDocumentRef(ref)
    ? subscribeFirestoreDocument({
        state,
        commit,
        ref,
        options
      })
    : subscribeFirestoreCollection({
        state,
        commit,
        ref,
        options
      })
}
