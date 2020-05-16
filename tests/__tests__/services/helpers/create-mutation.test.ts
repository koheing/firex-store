import { createMutation } from '../../../../src/services/helpers'
import { Store } from 'vuex'
import * as Vuex from 'vuex'
import { firestoreMutations } from '../../../../src'
import { createLocalVue } from '@vue/test-utils'

const Vue = createLocalVue()

Vue.use(Vuex)

describe('createMutation', () => {
  let store: Store<any>

  beforeEach(() => {
    store = new Store<any>({
      state: {
        document: { count: 0 },
        array: [],
      },
      mutations: {
        ...firestoreMutations('all'),
      },
      actions: {
        documentAdd: ({ commit }) => {
          const callMutation = createMutation({
            mutationType: 'collection',
            commit,
          })('counts')

          callMutation('added', { data: { count: 1 }, statePropName: 'counts' })
        },
      },
    })
  })

  it('document ADD', () => {
    store.dispatch('documentAdd')

    expect(store.state['counts'][0].count).toEqual(1)
  })
})
