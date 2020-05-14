import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import {
  actionTypes,
  firestoreMutations,
  firestoreUnsubscribeActions,
  firestoreUnsubscribeAction,
} from '../../../../../src/v0'
import { unsubscribeFirestore } from '../../../../../src/v0/store/helpers/unsubscribe'
jest.mock('../../../../../src/v0/store/helpers/unsubscribe')
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
      actions: {},
    })
  })

  it('unsubscribe collection , default action name and', async (done) => {
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
      },
      getters: {},
      mutations: {
        ...firestoreMutations({
          statePropName: 'comments',
          type: 'collection',
        }),
      },
      actions: {
        ...firestoreUnsubscribeActions({
          type: 'collection',
        }),
      },
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/${actionTypes.COLLECTION_UNSUBSCRIBE}`)

    expect(unsubscribeFirestore).toHaveBeenCalledTimes(1)

    done()
  })

  it('unsubscribe collection , custom action name', async (done) => {
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
      },
      getters: {},
      mutations: {
        ...firestoreMutations({
          statePropName: 'comments',
          type: 'collection',
        }),
      },
      actions: {
        ...firestoreUnsubscribeActions({
          type: 'collection',
          actionName: 'test',
        }),
      },
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/test`)

    expect(unsubscribeFirestore).toHaveBeenCalledTimes(2)

    done()
  })

  it('unsubscribe document , custom action name', async (done) => {
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null,
      },
      getters: {},
      mutations: {
        ...firestoreMutations({ statePropName: 'user', type: 'document' }),
      },
      actions: {
        ...firestoreUnsubscribeActions({
          type: 'document',
        }),
      },
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/${actionTypes.DOCUMENT_UNSUBSCRIBE}`)

    expect(unsubscribeFirestore).toHaveBeenCalledTimes(3)

    done()
  })
})

describe('unsubscribe-action', () => {
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

  it('unsubscribe collection , default action name and', async (done) => {
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
      },
      getters: {},
      mutations: {
        ...firestoreMutations({
          statePropName: 'comments',
          type: 'collection',
        }),
      },
      actions: {
        ...firestoreUnsubscribeAction({
          type: 'collection',
        }),
      },
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/${actionTypes.COLLECTION_UNSUBSCRIBE}`)

    expect(unsubscribeFirestore).toHaveBeenCalledTimes(4)

    done()
  })

  it('unsubscribe collection , custom action name', async (done) => {
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
      },
      getters: {},
      mutations: {
        ...firestoreMutations({
          statePropName: 'comments',
          type: 'collection',
        }),
      },
      actions: {
        ...firestoreUnsubscribeAction({
          type: 'collection',
          actionName: 'test',
        }),
      },
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/test`)

    expect(unsubscribeFirestore).toHaveBeenCalledTimes(5)

    done()
  })

  it('unsubscribe document , custom action name', async (done) => {
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null,
      },
      getters: {},
      mutations: {
        ...firestoreMutations({ statePropName: 'user', type: 'document' }),
      },
      actions: {
        ...firestoreUnsubscribeAction({
          type: 'document',
        }),
      },
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/${actionTypes.DOCUMENT_UNSUBSCRIBE}`)

    expect(unsubscribeFirestore).toHaveBeenCalledTimes(6)

    done()
  })
})
