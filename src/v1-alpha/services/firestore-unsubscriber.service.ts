import { Unsubscribe } from '../models'
import {
  FIREX_DOCUMENT_UNSUBSCRIBER,
  FIREX_COLLECTION_UNSUBSCRIBER
} from '../configurations'

export class FirestoreUnsubscriber implements Unsubscribe {
  private _type: 'document' | 'collection'

  constructor(type: 'document' | 'collection') {
    this._type = type
  }

  get type(): 'document' | 'collection' {
    return this._type
  }

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
