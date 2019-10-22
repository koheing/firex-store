import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import {
  actionTypes,
  firestoreMutations,
  firestoreUnsubscribeAction
} from '../../../../src/v1-alpha'
import { FirestoreUnsubscriber } from '../../../../src/v1-alpha/services'
import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../../../../src/v1-alpha/configurations'
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

  it('unsubscribe collection , default action name and', async (done) => {
    const mockUnsubscribe = jest.fn()
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
        [FIREX_COLLECTION_UNSUBSCRIBER]: mockUnsubscribe
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection')
      },
      actions: {
        ...firestoreUnsubscribeAction(
          FirestoreUnsubscriber.unbind('collection')
        )
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/${actionTypes.COLLECTION_UNSUBSCRIBE}`)

    expect(mockUnsubscribe).toHaveBeenCalled()

    done()
  })

  it('unsubscribe collection , custom action name', async (done) => {
    const mockUnsubscribe = jest.fn()
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
        [FIREX_COLLECTION_UNSUBSCRIBER]: mockUnsubscribe
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection')
      },
      actions: {
        ...firestoreUnsubscribeAction(
          FirestoreUnsubscriber.unbind('collection'),
          'test'
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
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null,
        [FIREX_DOCUMENT_UNSUBSCRIBER]: mockUnsubscribe
      },
      getters: {},
      mutations: {
        ...firestoreMutations('document')
      },
      actions: {
        ...firestoreUnsubscribeAction(FirestoreUnsubscriber.unbind('document'))
      }
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/${actionTypes.DOCUMENT_UNSUBSCRIBE}`)

    expect(mockUnsubscribe).toHaveBeenCalled()

    done()
  })
})
