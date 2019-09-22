import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store } from 'vuex'
import { firestoreMutations } from '../../../../src'
import { fireMutation } from '../../../../src/store/helpers/fire-mutation'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('fire-mutations', () => {
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
          actions: {
            add: ({ state, commit }, payload) => {
              fireMutation({
                mutationType: 'document',
                changeType: 'added',
                commit,
                payload
              })
            },
            modify: ({ state, commit }, payload) => {
              fireMutation({
                mutationType: 'document',
                changeType: 'modified',
                commit,
                payload
              })
            },
            remove: ({ commit }, payload) => {
              fireMutation({
                mutationType: 'document',
                changeType: 'removed',
                commit,
                payload
              })
            }
          }
        },
        comment: {
          namespaced: true,
          state: {
            comments: []
          },
          getters: {},
          mutations: {
            ...firestoreMutations({
              statePropName: 'comments',
              type: 'collection'
            })
          },
          actions: {
            add: ({ state, commit }, payload) => {
              fireMutation({
                mutationType: 'collection',
                changeType: 'added',
                commit,
                payload
              })
            }
          }
        }
      },
      state: {},
      getters: {},
      mutations: {},
      actions: {}
    })
  })

  it('document types.Add called', () => {
    store.dispatch('user/add', { docId: 'user1', name: 'testName1' })

    expect(store.state.user.user.docId).toEqual('user1')
  })

  it('document types.MODIFY called', () => {
    store.dispatch('user/add', { docId: 'user1', name: 'testName1' })
    store.dispatch('user/modify', { docId: 'user1', name: 'testName2' })

    expect(store.state.user.user.name).toEqual('testName2')
  })

  it('document types.REMOVE called', () => {
    store.dispatch('user/add', { docId: 'user1', name: 'testName1' })
    store.dispatch('user/remove', { docId: 'user1', name: 'testName1' })

    expect(store.state.user.user).toBeNull()
  })

  it('collection types.ADD called', () => {
    store.dispatch('comment/add', { docId: 'comment1', message: 'test' })

    expect(store.state.comment.comments[0].docId).toEqual('comment1')
  })
})
