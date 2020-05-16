import { MutationTree } from 'vuex'
import { mutationTypes } from '../types/mutation'
import { Payload } from '../../models'

const documentMutations = (): MutationTree<any> => {
  const types = mutationTypes.document
  return {
    [types.ADD](state, payload: Payload) {
      const prop = payload.statePropName
      state[prop] = payload.data
    },
    [types.MODIFY](state, payload: Payload) {
      const prop = payload.statePropName
      state[prop] = payload.data
    },
    [types.REMOVE](state, payload: Payload) {
      const prop = payload.statePropName
      state[prop] = null
    },
  }
}

const collectionMutations = (): MutationTree<any> => {
  const types = mutationTypes.collection
  return {
    [types.ADD](state, payload: Payload) {
      const prop = payload.statePropName
      if (state[prop] == null) {
        state[prop] = []
      }
      ;(state[prop] as Array<any>).push(payload.data)
    },
    [types.MODIFY](state, payload: Payload) {
      const prop = payload.statePropName
      const index = (state[prop] as Array<any>).findIndex(
        (data) => data.docId === payload.data.docId
      )
      if (index === -1) {
        return
      }
      ;(state[prop] as Array<any>).splice(index, 1, payload.data)
    },
    [types.REMOVE](state, payload: Payload) {
      const prop = payload.statePropName
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

export const firestoreMutations = (
  type: 'document' | 'collection' | 'all'
): MutationTree<any> => {
  switch (type) {
    case 'document':
      return { ...documentMutations() }
    case 'collection':
      return { ...collectionMutations() }
    default:
      return {
        ...documentMutations(),
        ...collectionMutations(),
      }
  }
}
