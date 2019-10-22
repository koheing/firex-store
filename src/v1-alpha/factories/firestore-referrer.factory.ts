import { FirestoreRef } from '../types'
import { FirestoreSubscriber } from '../services/firestore-subscriber.service'
import { FirestoreFetcher } from '../services/firestore-fetcher.service'
import { FirestoreUnsubscriber } from '../services/firestore-unsubscriber.service'

export class FirestoreReferrer {
  static from(ref: FirestoreRef) {
    return new FirestoreSubscriber(ref)
  }

  static where(ref: FirestoreRef) {
    return new FirestoreFetcher(ref)
  }

  static unbind(type: 'document' | 'collection') {
    return new FirestoreUnsubscriber(type)
  }
}
