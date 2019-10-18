import { Reference, Payload } from '../models'
import { FindCriteria, SubscribeCriteria } from '../criterias'
import { FirestoreService } from '../service'
import { FirestoreRef, CallMutation } from '../types'
import { FIREX_COLLECTION_UNSUBSCRIBER } from '../store/configurations'
import { callMutation } from '../store/helpers/call-mutation'
import { NOT_CALL_BIND_TO_METHOD_YET } from '../errors'

interface Criteria {
  ref: firebase.firestore.Query | firebase.firestore.CollectionReference
}

export class FirestoreCollectionReader implements Reference {
  ref: firebase.firestore.Query | firebase.firestore.CollectionReference
  private statePropName?: string

  constructor({ ref }: Criteria) {
    this.ref = ref
  }

  find<T = any>({ options }: FindCriteria<FirestoreRef, T>): Promise<any> {
    return FirestoreService.findAll({ ref: this.ref, ...options })
  }

  bindTo(statePropName: string): FirestoreCollectionReader {
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

    if (state[FIREX_COLLECTION_UNSUBSCRIBER]) {
      return
    }

    const mutation: CallMutation = (
      changeType: firebase.firestore.DocumentChangeType,
      payload: Payload
    ) => callMutation({ mutationType: 'document', changeType, commit, payload })
    const unsubscriber = FirestoreService.subscribeAll({
      ref: this.ref,
      callMutation: mutation,
      ...options
    })

    state[FIREX_COLLECTION_UNSUBSCRIBER] = unsubscriber
  }

  unsubscribe({ state }: { state: any }) {
    if (state[FIREX_COLLECTION_UNSUBSCRIBER]) {
      state[FIREX_COLLECTION_UNSUBSCRIBER]()
      delete state[FIREX_COLLECTION_UNSUBSCRIBER]
    }
  }
}
