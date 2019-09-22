import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import {
  firestoreSubscribeActions,
  actionTypes,
  firestoreMutations
} from '../../../../src'
import { firestore } from '../../../mocks/firebase'
import { subscribeFirestore } from '../../../../src/store/helpers/subscribe'
jest.mock('../../../../src/store/helpers/subscribe')
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
        ...firestoreSubscribeActions({ ref: firestore.collection('/comments') })
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/${actionTypes.COLLECTION_SUBSCRIBE}`)

    expect(subscribeFirestore).toHaveBeenCalledTimes(1)
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
        ...firestoreSubscribeActions({
          ref: firestore.collection('/comments'),
          actionName: 'test'
        })
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/test`)

    expect(subscribeFirestore).toHaveBeenCalledTimes(2)
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
        ...firestoreSubscribeActions({
          ref: firestore.collection('/users').doc('userId')
        })
      }
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/${actionTypes.DOCUMENT_SUBSCRIBE}`)

    expect(subscribeFirestore).toHaveBeenCalledTimes(3)
  })
})
