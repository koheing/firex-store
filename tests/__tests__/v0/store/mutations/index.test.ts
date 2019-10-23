import { firestoreMutations } from '../../../../../src/v0/store/mutations/index'
import { mutationTypes } from '../../../../../src/v0/store/types/mutation'
import * as Vuex from 'vuex'
import { Store } from 'vuex'
import { createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('firestoreMutation', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Store({
      modules: {
        user: {
          namespaced: true,
          state: {
            user: null
          },
          getters: {},
          mutations: {
            ...firestoreMutations({ statePropName: 'user', type: 'document' })
          },
          actions: {}
        },
        comment: {
          namespaced: true,
          state: {
            comments: null
          },
          getters: {},
          mutations: {
            ...firestoreMutations({
              statePropName: 'comments',
              type: 'collection'
            })
          },
          actions: {}
        }
      },
      state: {},
      getters: {},
      mutations: {},
      actions: {}
    })
  })

  it('document mutations defined', () => {
    const result = firestoreMutations({
      statePropName: 'test',
      type: 'document'
    })

    expect(result[mutationTypes.document.ADD]).not.toEqual(undefined)
  })

  it('collection mutations defined', () => {
    const result = firestoreMutations({
      statePropName: 'test',
      type: 'collection'
    })

    expect(result[mutationTypes.collection.ADD]).not.toEqual(undefined)
  })

  it('fire document.type.ADD mutation', () => {
    store.commit(`user/${mutationTypes.document.ADD}`, {
      data: {
        docId: 'testId',
        test: { name: 'testName1' }
      }
    })
    expect(store.state.user['user'].docId).toEqual('testId')
    expect(store.state.user['user'].test.name).toEqual('testName1')
  })

  it('fire document.type.MODIFY mutation', () => {
    store.commit(`user/${mutationTypes.document.ADD}`, {
      data: {
        docId: 'testId',
        test: { name: 'testName1' }
      }
    })
    store.commit(`user/${mutationTypes.document.MODIFY}`, {
      data: {
        docId: 'id',
        test: { name: 'testName2' }
      }
    })

    expect(store.state.user['user'].docId).toEqual('id')
    expect(store.state.user['user'].test.name).toEqual('testName2')
  })

  it('fire document.type.REMOVE mutation', () => {
    store.commit(`user/${mutationTypes.document.ADD}`, {
      data: {
        docId: 'testId',
        test: { name: 'testName1' }
      }
    })
    store.commit(`user/${mutationTypes.document.REMOVE}`)

    expect(store.state.user['user']).toEqual(null)
  })

  it('fire collection.type.ADD mutation', () => {
    store.commit(`comment/${mutationTypes.collection.ADD}`, {
      data: {
        docId: 'comment1',
        message: 'first',
        user: { name: 'testName1' }
      }
    })

    expect(store.state.comment['comments'][0].docId).toEqual('comment1')
    expect(store.state.comment['comments'][0].user.name).toEqual('testName1')
  })

  it('fire collection.type.MODIFY mutation', () => {
    store.commit(`comment/${mutationTypes.collection.ADD}`, {
      data: {
        docId: 'comment1',
        message: 'first',
        user: { name: 'testName1' }
      }
    })
    store.commit(`comment/${mutationTypes.collection.ADD}`, {
      data: {
        docId: 'comment2',
        message: 'second',
        user: { name: 'testName2' }
      }
    })

    store.commit(`comment/${mutationTypes.collection.MODIFY}`, {
      data: {
        docId: 'comment2',
        message: 'second',
        user: { name: 'testName1' }
      }
    })

    expect(store.state.comment['comments'][1].docId).toEqual('comment2')
    expect(store.state.comment['comments'][1].user.name).toEqual('testName1')
  })

  it('fire collection.type.REMOVE mutation', () => {
    store.commit(`comment/${mutationTypes.collection.ADD}`, {
      data: {
        docId: 'comment1',
        message: 'first',
        user: { name: 'testName1' }
      }
    })
    store.commit(`comment/${mutationTypes.collection.ADD}`, {
      data: {
        docId: 'comment2',
        message: 'second',
        user: { name: 'testName2' }
      }
    })

    store.commit(`comment/${mutationTypes.collection.REMOVE}`, {
      data: {
        docId: 'comment1',
        message: 'first',
        user: { name: 'testName1' }
      }
    })

    expect(store.state.comment['comments'][0].docId).toEqual('comment2')
    expect(store.state.comment['comments'][0].user.name).toEqual('testName2')
  })

  it('fire collection.type.MODIFY mutation, but cannot fix because of wrong docId', () => {
    store.commit(`comment/${mutationTypes.collection.ADD}`, {
      data: {
        docId: 'comment1',
        message: 'first',
        user: { name: 'testName1' }
      }
    })

    store.commit(`comment/${mutationTypes.collection.MODIFY}`, {
      data: {
        docId: 'comment3',
        message: 'second',
        user: { name: 'testName2' }
      }
    })

    expect(store.state.comment['comments'][0].docId).toEqual('comment1')
    expect(store.state.comment['comments'][0].user.name).toEqual('testName1')
  })

  it('fire collection.type.REMOVE mutation, but cannot fix because of wrong docId', () => {
    store.commit(`comment/${mutationTypes.collection.ADD}`, {
      data: {
        docId: 'comment1',
        message: 'first',
        user: { name: 'testName1' }
      }
    })

    store.commit(`comment/${mutationTypes.collection.REMOVE}`, {
      data: {
        docId: 'comment2',
        message: 'second',
        user: { name: 'testName2' }
      }
    })

    expect(store.state.comment['comments'][0].docId).toEqual('comment1')
    expect(store.state.comment['comments'][0].user.name).toEqual('testName1')
  })
})
