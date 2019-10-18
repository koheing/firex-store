import { MutationTree } from 'vuex'
import { mutationTypes } from '../types/mutation'
import { MutationType } from '../../types'
import { Payload } from '../../models'

interface Criteria {
  type: MutationType
}

const documentMutations = (): MutationTree<any> => {
  const types = mutationTypes.document
  return {
    [types.ADD](state, payload: Payload) {
      state[payload.statePropName!] = payload.data
    },
    [types.MODIFY](state, payload: Payload) {
      state[payload.statePropName!] = payload.data
    },
    [types.REMOVE](state, payload: Payload) {
      state[payload.statePropName!] = null
    }
  }
}

const collectionMutations = (): MutationTree<any> => {
  const types = mutationTypes.collection
  return {
    [types.ADD](state, payload: Payload) {
      if (state[payload.statePropName!] == null) {
        state[payload.statePropName!] = []
      }
      ;(state[payload.statePropName!] as Array<any>).push(payload.data)
    },
    [types.MODIFY](state, payload: Payload) {
      const index = (state[payload.statePropName!] as Array<any>).findIndex(
        (data) => data.docId === payload.data.docId
      )
      if (index === -1) {
        return
      }
      ;(state[payload.statePropName!] as Array<any>).splice(index, 1, payload.data)
    },
    [types.REMOVE](state, payload: Payload) {
      const index = (state[payload.statePropName!] as Array<any>).findIndex(
        (data) => data.docId === payload.data.docId
      )
      if (index === -1) {
        return
      }
      ;(state[payload.statePropName!] as Array<any>).splice(index, 1)
    }
  }
}

export const firestoreMutations = ({
  type
}: Criteria): MutationTree<any> => {
  switch (type) {
    case 'document':
      return { ...documentMutations() }
    case 'collection':
      return { ...collectionMutations() }
    default:
      return { ...documentMutations(), ...collectionMutations() }
  }
}
