import { MutationTree } from 'vuex'
import { mutationTypes } from '../types/mutation'
import { MutationType } from '../../types'
import { Payload } from '../../models'

interface Criteria {
  statePropName: string
  type: MutationType
}

const documentMutations = (prop: string): MutationTree<any> => {
  const types = mutationTypes.document
  return {
    [types.ADD](state, payload: Payload) {
      state[prop] = payload.data
    },
    [types.MODIFY](state, payload: Payload) {
      state[prop] = payload.data
    },
    [types.REMOVE](state) {
      state[prop] = null
    },
  }
}

const collectionMutations = (prop: string): MutationTree<any> => {
  const types = mutationTypes.collection
  return {
    [types.ADD](state, payload: Payload) {
      if (state[prop] == null) {
        state[prop] = []
      }
      ;(state[prop] as Array<any>).push(payload.data)
    },
    [types.MODIFY](state, payload: Payload) {
      const index = (state[prop] as Array<any>).findIndex(
        (data) => data.docId === payload.data.docId
      )
      if (index === -1) {
        return
      }
      ;(state[prop] as Array<any>).splice(index, 1, payload.data)
    },
    [types.REMOVE](state, payload: Payload) {
      const index = (state[prop] as Array<any>).findIndex(
        (data) => data.docId === payload.data.docId
      )
      if (index === -1) {
        return
      }
      ;(state[prop] as Array<any>).splice(index, 1)
    },
  }
}

export const firestoreMutations = ({
  statePropName,
  type,
}: Criteria): MutationTree<any> => {
  return type === 'document'
    ? documentMutations(statePropName)
    : collectionMutations(statePropName)
}
