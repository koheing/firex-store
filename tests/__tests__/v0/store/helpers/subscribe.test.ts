import { subscribeFirestore } from '../../../../../src/v0/'
import { FirestoreService } from '../../../../../src/v0/service/index'
import {
  FIREX_COLLECTION_UNSUBSCRIBER,
  FIREX_DOCUMENT_UNSUBSCRIBER,
} from '../../../../../src/v0/store/configurations'
import { MockQueryReference } from '../../../../mocks/mock-query-reference'
import { MockQuerySnapshot } from '../../../../mocks/mock-query-snapshot'
import { MockDocumentReference } from '../../../../mocks/mock-document-reference'
import { MockDocumentSnapshot } from '../../../../mocks/mock-document-snapshot'

describe('subscribe test', () => {
  it('subscribe collection', () => {
    const spy = jest.spyOn(FirestoreService, 'subscribeAll')
    subscribeFirestore({
      state: {},
      commit: jest.fn(),
      ref: new MockQueryReference(Promise.resolve(new MockQuerySnapshot())),
    })

    expect(spy).toHaveBeenCalled()
    spy.mockClear()
  })

  it('call subscribe collection, but cannot called', () => {
    const spy = jest.spyOn(FirestoreService, 'subscribeAll')
    subscribeFirestore({
      state: { [FIREX_COLLECTION_UNSUBSCRIBER]: jest.fn() },
      commit: jest.fn(),
      ref: new MockQueryReference(Promise.resolve(new MockQuerySnapshot())),
    })

    expect(spy).not.toHaveBeenCalled()
    spy.mockClear()
  })

  it('subscribe document', async () => {
    const spy = jest.spyOn(FirestoreService, 'subscribe')
    subscribeFirestore({
      state: {},
      commit: jest.fn(),
      ref: new MockDocumentReference(
        Promise.resolve(new MockDocumentSnapshot())
      ) as firebase.firestore.DocumentReference,
    })

    expect(spy).not.toHaveBeenCalled()
    spy.mockClear()
  })

  it('call subscribe document, but cannot called', () => {
    const spy = jest.spyOn(FirestoreService, 'subscribe')
    const documentRef: firebase.firestore.DocumentReference = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    ) as firebase.firestore.DocumentReference
    subscribeFirestore({
      state: { [FIREX_DOCUMENT_UNSUBSCRIBER]: jest.fn() },
      commit: jest.fn(),
      ref: documentRef,
    })

    expect(spy).not.toHaveBeenCalled()
    spy.mockClear()
  })
})
