import { Unsubscribe } from '../models'
import {
  FIREX_DOCUMENT_UNSUBSCRIBER,
  FIREX_COLLECTION_UNSUBSCRIBER
} from '../configurations'

/**
 * @description class unsubscribe firestore data to state property
 *
 * @example
 *   FirestoreUnsubscriber
 *     .unbind('collection')
 *     .unsubscribe(state)
 */
export class FirestoreUnsubscriber implements Unsubscribe {
  private _type: 'document' | 'collection'

  /**
   * @description Make FirestoreUnsubscriber instance
   * @param type: 'document' | 'collection'
   * @returns FirestoreUnsubscriber
   */
  static unbind(type: 'document' | 'collection'): FirestoreUnsubscriber {
    return new FirestoreUnsubscriber(type)
  }

  constructor(type: 'document' | 'collection') {
    this._type = type
  }

  get type(): 'document' | 'collection' {
    return this._type
  }

  /**
   * @description unsubscribe firestore data
   * @param state: any
   */
  unsubscribe(state: any) {
    const prop =
      this.type === 'document'
        ? FIREX_DOCUMENT_UNSUBSCRIBER
        : FIREX_COLLECTION_UNSUBSCRIBER
    if (state[prop]) {
      state[prop]()
      delete state[prop]
    }
  }
}
