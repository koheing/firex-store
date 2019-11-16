import { FirestoreDocumentWriterFacade } from '../../../../src/creators/helpers'
import { MockCollectionReference } from '../../../mocks/mock-collection-reference'
import { FirestoreRepository } from '../../../../src/repositories'
import { firestore } from '../../../mocks/firebase'
import * as flushPromises from 'flush-promises'
import * as firebase from 'firebase'

describe('FirestoreDocumentWriterFacade', () => {
  it('call FirestoreMergeSetter with not transaction', async (done) => {
    const mockSetter = jest.spyOn(FirestoreRepository, 'set')
    const writerFacade = new FirestoreDocumentWriterFacade(
      new MockCollectionReference({}).doc('documentId')
    )
    const result = writerFacade.mergeSet({})
    await flushPromises()
    expect(FirestoreRepository.set).toHaveBeenCalled()
    expect(mockSetter.mock.calls[0][0].isTransaction).toBeFalsy()
    expect(mockSetter.mock.calls[0][0].merge).toBeTruthy()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()
    done()
  })

  it('call FirestoreMergeSetter with transaction', async (done) => {
    const mockSetter = jest.spyOn(FirestoreRepository, 'set')
    const writerFacade = new FirestoreDocumentWriterFacade(
      new MockCollectionReference({}).doc('documentId')
    ).transaction()
    const result = writerFacade.mergeSet({})
    await flushPromises()
    expect(FirestoreRepository.set).toHaveBeenCalled()
    expect(mockSetter.mock.calls[0][0].isTransaction).toBeTruthy()
    expect(mockSetter.mock.calls[0][0].merge).toBeTruthy()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()
    done()
  })

  it('call FirestoreSetter with not transaction', async (done) => {
    const mockSetter = jest.spyOn(FirestoreRepository, 'set')
    const writerFacade = new FirestoreDocumentWriterFacade(
      new MockCollectionReference({}).doc('documentId')
    )
    const result = writerFacade.set({})
    await flushPromises()
    expect(FirestoreRepository.set).toHaveBeenCalled()
    expect(mockSetter.mock.calls[0][0].isTransaction).toBeFalsy()
    expect(mockSetter.mock.calls[0][0].merge).toBeFalsy()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()
    done()
  })

  it('call FirestoreSetter with transaction', async (done) => {
    const mockSetter = jest.spyOn(FirestoreRepository, 'set')
    const writerFacade = new FirestoreDocumentWriterFacade(
      new MockCollectionReference({}).doc('documentId')
    ).transaction()
    const result = writerFacade.set({})
    await flushPromises()
    expect(FirestoreRepository.set).toHaveBeenCalled()
    expect(mockSetter.mock.calls[0][0].isTransaction).toBeTruthy()
    expect(mockSetter.mock.calls[0][0].merge).toBeFalsy()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()
    done()
  })

  it('call FirestoreDeleter with not transaction', async (done) => {
    const mockSetter = jest.spyOn(FirestoreRepository, 'delete')
    const writerFacade = new FirestoreDocumentWriterFacade(
      new MockCollectionReference({}).doc('documentId')
    )
    const result = writerFacade.delete({})
    await flushPromises()
    expect(FirestoreRepository.delete).toHaveBeenCalled()
    expect(mockSetter.mock.calls[0][0].isTransaction).toBeFalsy()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()
    done()
  })

  it('call FirestoreDeleter with transaction', async (done) => {
    const mockSetter = jest.spyOn(FirestoreRepository, 'delete')
    const writerFacade = new FirestoreDocumentWriterFacade(
      new MockCollectionReference({}).doc('documentId')
    ).transaction()
    const result = writerFacade.delete({})
    await flushPromises()
    expect(FirestoreRepository.delete).toHaveBeenCalled()
    expect(mockSetter.mock.calls[0][0].isTransaction).toBeTruthy()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()
    done()
  })

  it('get ref', () => {
    const writerFacade = new FirestoreDocumentWriterFacade(
      firestore.collection('comments').doc('comment')
    )
    expect(writerFacade.ref).toBeInstanceOf(
      firebase.firestore.DocumentReference
    )
  })

  it('get isTransaction', () => {
    const writerFacade = new FirestoreDocumentWriterFacade(
      new MockCollectionReference({}).doc('documentId')
    ).transaction()
    expect(writerFacade.isTransaction).toBeTruthy()
  })
})
