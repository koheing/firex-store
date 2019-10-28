import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import {
  actionTypes,
  firestoreMutations,
  firestoreUnsubscribeAction
} from '../../../../src'
import { FirestoreUnsubscriber } from '../../../../src/services'
import { FIREX_UNSUBSCRIBES } from '../../../../src/configurations'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('unsubscribe-action', () => {
  let store: Store<any>
  beforeEach(() => {
    store = new Store({
      modules: {},
      state: {},
      getters: {},
      mutations: {},
      actions: {}
    })
  })

  it('unsubscribe collection , default action name', async (done) => {
    const mockUnsubscribe = jest.fn()
    const mockMap = new Map<string, any>()
    mockMap.set('comments', mockUnsubscribe)
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
        [FIREX_UNSUBSCRIBES]: mockMap
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection')
      },
      actions: {
        ...firestoreUnsubscribeAction(FirestoreUnsubscriber.on('comments'), { type: 'collection' })
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/${actionTypes.collection.UNSUBSCRIBE}`)

    expect(mockUnsubscribe).toHaveBeenCalled()

    done()
  })

  it('unsubscribe collection , custom action name', async (done) => {
    const mockUnsubscribe = jest.fn()
    const mockMap = new Map<string, any>()
    mockMap.set('comments', mockUnsubscribe)
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
        [FIREX_UNSUBSCRIBES]: mockMap
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection')
      },
      actions: {
        ...firestoreUnsubscribeAction(
          FirestoreUnsubscriber.on('comments'),
          { type: 'collection', actionName: 'test' }
        )
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/test`)

    expect(mockUnsubscribe).toHaveBeenCalled()

    done()
  })

  it('unsubscribe document , custom action name', async (done) => {
    const mockUnsubscribe = jest.fn()
    const mockMap = new Map<string, any>()
    mockMap.set('user', mockUnsubscribe)
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null,
        [FIREX_UNSUBSCRIBES]: mockMap
      },
      getters: {},
      mutations: {
        ...firestoreMutations('document')
      },
      actions: {
        ...firestoreUnsubscribeAction(FirestoreUnsubscriber.on('user'), { type: 'document' })
      }
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/${actionTypes.document.UNSUBSCRIBE}`)

    expect(mockUnsubscribe).toHaveBeenCalled()

    done()
  })
})
