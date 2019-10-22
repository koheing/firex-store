import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'
import { Store, Module } from 'vuex'
import {
  firestoreSubscribeAction,
  actionTypes,
  firestoreMutations
} from '../../../../src/v1-alpha'
import { firestore } from '../../../mocks/firebase'
import {
  subscribeFirestoreCollection,
  subscribeFirestoreDocument
} from '../../../../src/v1-alpha/services/helpers/subscribe'
import { FirestoreSubscriber } from '../../../../src/v1-alpha/services'
jest.mock('../../../../src/v1-alpha/services/helpers/subscribe')
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

  it('subscribe collection , default action name', async (done) => {
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

    expect(subscribeFirestoreCollection).toHaveBeenCalledTimes(1)

    done()
  })

  it('subscribe collection , custom action name', async (done) => {
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

    expect(subscribeFirestoreCollection).toHaveBeenCalledTimes(2)

    done()
  })

  it('subscribe document , default action name', async (done) => {
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
            firestore.collection('/users').doc('docId')
          ).bindTo('userId')
        )
      }
    }

    store.registerModule('user', userModule)

    await store.dispatch(`user/${actionTypes.DOCUMENT_SUBSCRIBE}`)

    expect(subscribeFirestoreDocument).toHaveBeenCalledTimes(1)

    done()
  })
})
