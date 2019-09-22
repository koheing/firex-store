import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import {
  actionTypes,
  firestoreMutations,
  firestoreUnsubscribeActions
} from '../../../../src'
import { unsubscribeFirestore } from '../../../../src/store/helpers/unsubscribe'
jest.mock('../../../../src/store/helpers/unsubscribe')
const localVue = createLocalVue()
localVue.use(Vuex)

describe('subscribe-action', () => {
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

  it('subscribe collection , default action name and', async () => {
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null
      },
      getters: {},
      mutations: {
        ...firestoreMutations({ statePropName: 'comments', type: 'collection' })
      },
      actions: {
        ...firestoreUnsubscribeActions({
          type: 'collection'
        })
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/${actionTypes.COLLECTION_UNSUBSCRIBE}`)

    expect(unsubscribeFirestore).toHaveBeenCalledTimes(1)
  })

  it('subscribe collection , custom action name', async () => {
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null
      },
      getters: {},
      mutations: {
        ...firestoreMutations({ statePropName: 'comments', type: 'collection' })
      },
      actions: {
        ...firestoreUnsubscribeActions({
          type: 'collection',
          actionName: 'test'
        })
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/test`)

    expect(unsubscribeFirestore).toHaveBeenCalledTimes(2)
  })

  it('subscribe document , custom action name', async () => {
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null
      },
      getters: {},
      mutations: {
        ...firestoreMutations({ statePropName: 'user', type: 'document' })
      },
      actions: {
        ...firestoreUnsubscribeActions({
          type: 'document'
        })
      }
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/${actionTypes.DOCUMENT_UNSUBSCRIBE}`)

    expect(unsubscribeFirestore).toHaveBeenCalledTimes(3)
  })
})
