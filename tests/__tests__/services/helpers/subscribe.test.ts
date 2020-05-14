import { MockQueryReference } from '../../../mocks/mock-query-reference'
import { MockDocumentReference } from '../../../mocks/mock-document-reference'
import {
  subscribeFirestoreCollection,
  subscribeFirestoreDocument,
} from '../../../../src/services/helpers'
import { MockQuerySnapshot } from '../../../mocks/mock-query-snapshot'
import { FirestoreRepository } from '../../../../src/repositories'
import { FIREX_UNSUBSCRIBES } from '../../../../src/configurations'
import { MockDocumentSnapshot } from '../../../mocks/mock-document-snapshot'

describe('subscribe test', () => {
  it('subscribe collection', () => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribeAll')
    const mockMap = new Map<string, any>()
    mockMap.set('dummy', jest.fn())
    const mockState = { [FIREX_UNSUBSCRIBES]: mockMap }
    subscribeFirestoreCollection({
      statePropName: 'test',
      state: mockState,
      commit: jest.fn(),
      ref: new MockQueryReference(
        Promise.resolve(new MockQuerySnapshot())
      ) as firebase.firestore.Query,
    })

    expect(mockState[FIREX_UNSUBSCRIBES].size).toEqual(2)
    expect(spy).toHaveBeenCalled()
    spy.mockClear()
  })

  it('subscribe document', () => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribe')
    const mockMap = new Map<string, any>()
    mockMap.set('dummy', jest.fn())
    const mockState = { [FIREX_UNSUBSCRIBES]: mockMap }
    subscribeFirestoreDocument({
      statePropName: 'test',
      state: mockState,
      commit: jest.fn(),
      ref: new MockDocumentReference(
        Promise.resolve(new MockDocumentSnapshot())
      ) as firebase.firestore.DocumentReference,
    })

    expect(mockState[FIREX_UNSUBSCRIBES].size).toEqual(2)
    expect(spy).toHaveBeenCalled()
    spy.mockClear()
  })
})
