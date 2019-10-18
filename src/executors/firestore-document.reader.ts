import { Reference, Payload } from '../models'
import { FindCriteria, SubscribeCriteria, UnsubscribeCriteria } from '../criterias'
import { FirestoreService } from '../service'
import { FirestoreRef, CallMutation } from '../types'
import { FIREX_DOCUMENT_UNSUBSCRIBER } from '../store/configurations'
import { callMutation } from '../store/helpers/call-mutation'
import { NOT_CALL_BIND_TO_METHOD_YET } from '../errors'

interface Criteria {
  ref: firebase.firestore.DocumentReference
}

export class FirestoreDocumentReader implements Reference {
  ref: firebase.firestore.DocumentReference
  private statePropName?: string

  constructor({ ref }: Criteria) {
    this.ref = ref
  }

  find<T = any>({ options }: FindCriteria<FirestoreRef, T>): Promise<any> {
    return FirestoreService.find({ ref: this.ref, ...options })
  }

  bindTo(statePropName: string): FirestoreDocumentReader {
    this.statePropName = statePropName
    return this
  }

  subscribe<T = any>({
    state,
    commit,
    options
  }: SubscribeCriteria<FirestoreRef, T>) {
    if (!this.statePropName) {
      console.error(NOT_CALL_BIND_TO_METHOD_YET)
      return
    }

    if (state[FIREX_DOCUMENT_UNSUBSCRIBER]) {
      return
    }

    const mutation: CallMutation = (
      changeType: firebase.firestore.DocumentChangeType,
      payload: Payload
    ) => callMutation({ mutationType: 'document', changeType, commit, payload })
    const unsubscriber = FirestoreService.subscribe({
      ref: this.ref,
      callMutation: mutation,
      ...options
    })

    state[FIREX_DOCUMENT_UNSUBSCRIBER] = unsubscriber
  }

  unsubscribe({ state }: { state: any }) {
    if (state[FIREX_DOCUMENT_UNSUBSCRIBER]) {
      state[FIREX_DOCUMENT_UNSUBSCRIBER]()
      delete state[FIREX_DOCUMENT_UNSUBSCRIBER]
    }
  }
}
