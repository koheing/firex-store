import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import {
  firestoreSubscribeAction,
  actionTypes,
  firestoreMutations,
  FirestoreSubscriber
} from '../../../../../src/v1-alpha'
import { firestore } from '../../../../mocks/firebase'
import { FirestoreRepository } from '../../../../../src/v1-alpha/repositories'
import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../../../../../src/v1-alpha/configurations'

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
    const spy = jest.spyOn(FirestoreRepository, 'subscribeAll')
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection')
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(firestore.collection('/comments')).bindTo(
            'comments'
          )
        )
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/${actionTypes.COLLECTION_SUBSCRIBE}`)

    expect(spy).toHaveBeenCalled()

    spy.mockClear()

    done()
  })

  it('subscribe collection , custom action name', async (done) => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribeAll')
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection')
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(firestore.collection('/comments')).bindTo(
            'comments'
          ),
          { actionName: 'test' }
        )
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/test`)

    expect(spy).toHaveBeenCalled()
    spy.mockClear()

    done()
  })

  it('subscribe document , default action name', async (done) => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribe')
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null
      },
      getters: {},
      mutations: {
        ...firestoreMutations('document')
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(
            firestore.collection('/users').doc('userId')
          ).bindTo('userId')
        )
      }
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/${actionTypes.DOCUMENT_SUBSCRIBE}`)

    expect(spy).toHaveBeenCalled()
    spy.mockClear()

    done()
  })

  it('collection state has Unsubscriber', async (done) => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribeAll')
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection')
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(firestore.collection('/comments')).bindTo(
            'comments'
          ),
          { actionName: 'test' }
        )
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
    const spy = jest.spyOn(FirestoreRepository, 'subscribe')
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null
      },
      getters: {},
      mutations: {
        ...firestoreMutations('document')
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(
            firestore.collection('/users').doc('userId')
          ).bindTo('user')
        )
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
    const spy = jest.spyOn(FirestoreRepository, 'subscribeAll')
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
        [FIREX_COLLECTION_UNSUBSCRIBER]: jest.fn()
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection')
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(firestore.collection('/comments')).bindTo(
            'comments'
          ),
          { actionName: 'test' }
        )
      }
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/test`)

    expect(spy).not.toHaveBeenCalled()
    spy.mockClear()

    done()
  })

  it('cannot call suibscribe when it had already called', async (done) => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribe')
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null,
        [FIREX_DOCUMENT_UNSUBSCRIBER]: jest.fn()
      },
      getters: {},
      mutations: {
        ...firestoreMutations('document')
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(
            firestore.collection('/users').doc('userId')
          ).bindTo('user'),
          { actionName: 'test' }
        )
      }
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/test`)

    expect(spy).not.toHaveBeenCalled()
    spy.mockClear()

    done()
  })
})
