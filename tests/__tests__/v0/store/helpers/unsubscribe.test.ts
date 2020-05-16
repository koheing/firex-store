import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import { unsubscribeFirestore } from '../../../../../src/v0/'
import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER,
} from '../../../../../src/v0/store/configurations'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('subscribe', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Store({
      modules: {},
      state: {},
      getters: {},
      mutations: {},
      actions: {},
    })
  })

  it('unsubscribe collection', async (done) => {
    const mockFunction = () => jest.fn()
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
        [FIREX_COLLECTION_UNSUBSCRIBER]: mockFunction(),
      },
      getters: {},
      mutations: {},
      actions: {
        unsubscribe: ({ state }) => {
          unsubscribeFirestore({ state, type: 'collection' })
        },
      },
    }

    store.registerModule('comment', commentModule)

    await store.dispatch('comment/unsubscribe')

    expect(store.state.comment[FIREX_COLLECTION_UNSUBSCRIBER]).toBeUndefined()
    done()
  })

  it('unsubscribe document', async (done) => {
    const mockFunction = () => jest.fn()
    const userMocule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null,
        [FIREX_COLLECTION_UNSUBSCRIBER]: mockFunction(),
      },
      getters: {},
      mutations: {},
      actions: {
        unsubscribe: ({ state }) => {
          unsubscribeFirestore({ state, type: 'document' })
        },
      },
    }

    store.registerModule('user', userMocule)

    await store.dispatch('user/unsubscribe')

    expect(store.state.user[FIREX_DOCUMENT_UNSUBSCRIBER]).toBeUndefined()

    done()
  })
})
