import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../configurations'
import { MutationType } from '../../types'

interface UnsubscribeCriteria {
  state: any
  type: MutationType
}

/**
 * @description unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param state any. vuex's state
 */
export const unsubscribeFirestore = ({ state, type }: UnsubscribeCriteria) => {
  const prop =
    type === 'document'
      ? FIREX_DOCUMENT_UNSUBSCRIBER
      : FIREX_COLLECTION_UNSUBSCRIBER

  if (state[prop]) {
    state[prop]()
    delete state[prop]
  }
}
