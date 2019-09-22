import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import {
  firestoreSubscribeActions,
  actionTypes,
  firestoreMutations
} from '../../../../src'
import { firestore } from '../../../mocks/firebase'
import { FirestoreService } from '../../../../src/service/index'
import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../../../../src/store/configurations'

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
      actions: {}
    })
  })

  it('subscribe collection , default action name', async (done) => {
    const spy = jest.spyOn(FirestoreService, 'subscribeAll')
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

    expect(spy).toHaveBeenCalled()

    spy.mockClear()

    done()
  })

  it('subscribe collection , custom action name', async (done) => {
    const spy = jest.spyOn(FirestoreService, 'subscribeAll')
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

    expect(spy).toHaveBeenCalled()
    spy.mockClear()

    done()
  })

  it('subscribe document , custom action name', async (done) => {
    const spy = jest.spyOn(FirestoreService, 'subscribe')
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

    expect(spy).toHaveBeenCalled()
    spy.mockClear()

    done()
  })

  it('collection state has Unsubscriber', async (done) => {
    const spy = jest.spyOn(FirestoreService, 'subscribeAll')
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
    expect(store.state.comment[FIREX_COLLECTION_UNSUBSCRIBER]).toBeUndefined()

    await store.dispatch(`comment/test`)

    expect(
      store.state.comment[FIREX_COLLECTION_UNSUBSCRIBER]
    ).not.toBeUndefined()
    spy.mockClear()

    done()
  })

  it('document state has Unsubscriber', async (done) => {
    const spy = jest.spyOn(FirestoreService, 'subscribe')
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
    expect(store.state.user[FIREX_DOCUMENT_UNSUBSCRIBER]).toBeUndefined()

    await store.dispatch(`user/${actionTypes.DOCUMENT_SUBSCRIBE}`)

    expect(store.state.user[FIREX_DOCUMENT_UNSUBSCRIBER]).not.toBeUndefined()
    spy.mockClear()

    done()
  })

  it('cannot call suibscribeAll when it had already called', async (done) => {
    const spy = jest.spyOn(FirestoreService, 'subscribeAll')
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
        [FIREX_COLLECTION_UNSUBSCRIBER]: jest.fn()
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

    expect(spy).not.toHaveBeenCalled()
    spy.mockClear()

    done()
  })

  it('cannot call suibscribe when it had already called', async (done) => {
    const spy = jest.spyOn(FirestoreService, 'subscribe')
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null,
        [FIREX_DOCUMENT_UNSUBSCRIBER]: jest.fn()
      },
      getters: {},
      mutations: {
        ...firestoreMutations({ statePropName: 'user', type: 'document' })
      },
      actions: {
        ...firestoreSubscribeActions({
          ref: firestore.collection('/users').doc('userId'),
          actionName: 'test'
        })
      }
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/test`)

    expect(spy).not.toHaveBeenCalled()
    spy.mockClear()

    done()
  })
})
