import { MockQueryReference } from '../../../../mocks/mock-query-reference'
import { MockDocumentReference } from '../../../../mocks/mock-document-reference'
import {
  subscribeFirestoreCollection,
  subscribeFirestoreDocument
} from '../../../../../src/v1-alpha/services/helpers'
import { MockQuerySnapshot } from '../../../../mocks/mock-query-snapshot'
import { FirestoreRepository } from '../../../../../src/v1-alpha/repositories'
import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER
} from '../../../../../src/v1-alpha/configurations'
import { MockDocumentSnapshot } from '../../../../mocks/mock-document-snapshot'

describe('subscribe test', () => {
  it('subscribe collection', () => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribeAll')
    subscribeFirestoreCollection({
      statePropName: 'test',
      state: {},
      commit: jest.fn(),
      ref: new MockQueryReference(Promise.resolve(new MockQuerySnapshot()))
    })

    expect(spy).toHaveBeenCalled()
    spy.mockClear()
  })

  it('call subscribe collection, but cannot called', () => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribeAll')
    subscribeFirestoreCollection({
      statePropName: 'test',
      state: { [FIREX_COLLECTION_UNSUBSCRIBER]: jest.fn() },
      commit: jest.fn(),
      ref: new MockQueryReference(Promise.resolve(new MockQuerySnapshot()))
    })

    expect(spy).not.toHaveBeenCalled()
    spy.mockClear()
  })

  it('subscribe document', () => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribe')
    subscribeFirestoreDocument({
      statePropName: 'test',
      state: {},
      commit: jest.fn(),
      ref: new MockDocumentReference(
        Promise.resolve(new MockDocumentSnapshot())
      )
    })

    expect(spy).toHaveBeenCalled()
    spy.mockClear()
  })

  it('call subscribe document, but cannot called', () => {
    const spy = jest.spyOn(FirestoreRepository, 'subscribe')
    subscribeFirestoreDocument({
      statePropName: 'test',
      state: { [FIREX_DOCUMENT_UNSUBSCRIBER]: jest.fn() },
      commit: jest.fn(),
      ref: new MockDocumentReference(
        Promise.resolve(new MockDocumentSnapshot())
      )
    })

    expect(spy).not.toHaveBeenCalled()
    spy.mockClear()
  })
})
