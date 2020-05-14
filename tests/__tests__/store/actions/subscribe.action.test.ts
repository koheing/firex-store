import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import {
  firestoreSubscribeAction,
  actionTypes,
  firestoreMutations,
} from '../../../../src'
import { firestore } from '../../../mocks/firebase'
import {
  subscribeFirestoreCollection,
  subscribeFirestoreDocument,
} from '../../../../src/services/helpers/subscribe'
import { FirestoreSubscriber } from '../../../../src/services'
jest.mock('../../../../src/services/helpers/subscribe')
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
      actions: {},
    })

    jest.clearAllMocks()
  })

  it('subscribe collection , default action name', async (done) => {
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection'),
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(firestore.collection('/comments')).bindTo(
            'comments'
          )
        ),
      },
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/${actionTypes.collection.SUBSCRIBE}`)

    expect(subscribeFirestoreCollection).toHaveBeenCalled()

    done()
  })

  it('subscribe collection , custom action name', async (done) => {
    const commentModule: Module<any, any> = {
      namespaced: true,
      state: {
        comments: null,
      },
      getters: {},
      mutations: {
        ...firestoreMutations('collection'),
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(firestore.collection('/comments')).bindTo(
            'comments'
          ),
          { actionName: 'test' }
        ),
      },
    }

    store.registerModule('comment', commentModule)

    await store.dispatch(`comment/test`)

    expect(subscribeFirestoreCollection).toHaveBeenCalled()

    done()
  })

  it('subscribe document , default action name', async (done) => {
    const userModule: Module<any, any> = {
      namespaced: true,
      state: {
        user: null,
      },
      getters: {},
      mutations: {
        ...firestoreMutations('document'),
      },
      actions: {
        ...firestoreSubscribeAction(
          FirestoreSubscriber.from(
            firestore.collection('/users').doc('docId')
          ).bindTo('userId')
        ),
      },
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/${actionTypes.document.SUBSCRIBE}`)

    expect(subscribeFirestoreDocument).toHaveBeenCalled()

    done()
  })
})
