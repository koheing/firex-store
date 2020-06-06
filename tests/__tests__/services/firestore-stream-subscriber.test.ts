import { FirestoreStreamSubscriber, bindTo, map } from '../../../src/services'
import { FIREX_UNSUBSCRIBES } from '../../../src/configurations'
import { isDocumentRef } from '../../../src/utils/is-document-ref'
import { Unsubscribes } from '../../../src/types'
import { createLocalVue } from '@vue/test-utils'
import * as Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../../../src/utils/is-document-ref')

describe('FirestoreStreamSubscriber', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockDocumentSnapshot = {
    id: 'chara001',
    exists: true,
    data: jest.fn(() => ({ name: 'sans' })),
  }

  const mockQuerySnapshot = {
    empty: false,
    docs: [
      mockDocumentSnapshot,
      {
        id: 'chara002',
        exists: true,
        data: jest.fn(() => ({ name: 'papyrus' })),
      },
    ],
    docChanges: () => [
      { doc: mockDocumentSnapshot },
      {
        doc: {
          id: 'chara002',
          exists: true,
          data: jest.fn(() => ({ name: 'papyrus' })),
        },
      },
    ],
  }

  it('subscribe: document reference succeeded', () => {
    const mockIsDocumentRef = (isDocumentRef as unknown) as jest.Mock
    mockIsDocumentRef.mockImplementation(() => true)
    const unsubscribe = () => jest.fn()
    const state = {
      charactor: null,
    }
    const ref = {
      onSnapshot: (onNext: any) => {
        onNext(mockDocumentSnapshot)
        return unsubscribe
      },
    }

    // @ts-ignore
    FirestoreStreamSubscriber.from(ref)
      .pipe(
        map((data) => ({ id: data.docId, name: data.name })),
        bindTo('charactor')
      )
      .subscribe(state, jest.fn())

    const unsubscribes: Unsubscribes = (state as any)[FIREX_UNSUBSCRIBES]
    expect(unsubscribes.get('charactor')).not.toBeUndefined()
  })

  it('subscribe: collection reference succeeded', () => {
    const mockIsDocumentRef = (isDocumentRef as unknown) as jest.Mock
    mockIsDocumentRef.mockImplementation(() => false)
    const unsubscribe = () => jest.fn()
    const state = {
      charactor: null,
    }
    const ref = {
      onSnapshot: (onNext: any) => {
        onNext(mockQuerySnapshot)
        return unsubscribe
      },
    }

    // @ts-ignore
    FirestoreStreamSubscriber.from(ref)
      .pipe(
        map((data) => ({ id: data.docId, name: data.name })),
        bindTo('charactor')
      )
      .subscribe(state, jest.fn())

    const unsubscribes: Unsubscribes = (state as any)[FIREX_UNSUBSCRIBES]
    expect(unsubscribes.get('charactor')).not.toBeUndefined()
  })

  it('subscribe: call at once, only', () => {
    const mockIsDocumentRef = (isDocumentRef as unknown) as jest.Mock
    mockIsDocumentRef.mockImplementation(() => true)
    const unsubscribe = () => jest.fn()
    const state = {
      charactor: null,
      [FIREX_UNSUBSCRIBES]: new Map(),
    }
    const ref = {
      onSnapshot: (onNext: any) => {
        onNext(mockDocumentSnapshot)
        return unsubscribe
      },
    }

    // @ts-ignore
    const subscriber = FirestoreStreamSubscriber.from(ref)

    subscriber
      .pipe(
        map((data) => ({ id: data.docId, name: data.name })),
        bindTo('charactor')
      )
      .subscribe(state, jest.fn())

    expect(subscriber['_statePropName']).toEqual('charactor')
    const spyRef = spyOn(ref, 'onSnapshot')

    subscriber
      .pipe(
        map((data) => ({ id: data.docId, name: data.name })),
        bindTo('charactor')
      )
      .subscribe(state, jest.fn())

    expect(spyRef).not.toHaveBeenCalled()
  })
})
