import { MutationTree } from 'vuex'
import { mutationTypes } from '../types/mutation'
import { MutationType } from '../../types'
import { Payload } from '../../models'

interface Criteria {
  type: MutationType
  statePropName?: string
}

const documentMutations = (statePropName?: string): MutationTree<any> => {
  const types = mutationTypes.document
  return {
    [types.ADD](state, payload: Payload) {
      const prop = statePropName ? statePropName : payload.statePropName!
      state[prop] = payload.data
    },
    [types.MODIFY](state, payload: Payload) {
      const prop = statePropName ? statePropName : payload.statePropName!
      state[prop] = payload.data
    },
    [types.REMOVE](state, payload: Payload) {
      const prop = statePropName ? statePropName : payload.statePropName!
      state[prop] = null
    }
  }
}

const collectionMutations = (statePropName?: string): MutationTree<any> => {
  const types = mutationTypes.collection
  return {
    [types.ADD](state, payload: Payload) {
      const prop = statePropName ? statePropName : payload.statePropName!
      if (state[prop] == null) {
        state[prop] = []
      }
      ;(state[prop] as Array<any>).push(payload.data)
    },
    [types.MODIFY](state, payload: Payload) {
      const prop = statePropName ? statePropName : payload.statePropName!
      const index = (state[prop] as Array<any>).findIndex(
        (data) => data.docId === payload.data.docId
      )
      if (index === -1) {
        return
      }
      ;(state[prop] as Array<any>).splice(index, 1, payload.data)
    },
    [types.REMOVE](state, payload: Payload) {
      const prop = statePropName ? statePropName : payload.statePropName!
      const index = (state[prop] as Array<any>).findIndex(
        (data) => data.docId === payload.data.docId
      )
      if (index === -1) {
        return
      }
      ;(state[prop] as Array<any>).splice(index, 1)
    }
  }
}

export const firestoreMutations = ({
  type,
  statePropName
}: Criteria): MutationTree<any> => {
  switch (type) {
    case 'document':
      return { ...documentMutations(statePropName) }
    case 'collection':
      return { ...collectionMutations(statePropName) }
    default:
      return {
        ...documentMutations(statePropName),
        ...collectionMutations(statePropName)
      }
  }
}
