import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../configurations'
import { MutationType } from '../../types'

interface Criteria {
  state: any
  type: MutationType
}

/**
 *  unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param state any. vuex's state
 */
export const unsubscribeFirestore = ({ state, type }: Criteria) => {
  const prop =
    type === 'document'
      ? FIREX_DOCUMENT_UNSUBSCRIBER
      : FIREX_COLLECTION_UNSUBSCRIBER

  if (state[prop]) {
    state[prop]()
    delete state[prop]
  }
}
