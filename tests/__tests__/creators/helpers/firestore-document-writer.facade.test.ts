import { FirestoreDocumentWriterFacade } from '../../../../src/creators/helpers'
import { MockCollectionReference } from '../../../mocks/mock-collection-reference'
import { FirestoreRepository } from '../../../../src/repositories'
import * as flushPromises from 'flush-promises'

describe('FirestoreDocumentWriterFacade', () => {

  it('call FirestoreMergeSetter with not transaction', async (done) => {
    const mockSetter = jest.spyOn(FirestoreRepository, 'set')
    const writerFacade = new FirestoreDocumentWriterFacade(new MockCollectionReference({}).doc('documentId'))
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
    const writerFacade = new FirestoreDocumentWriterFacade(new MockCollectionReference({}).doc('documentId')).transaction()
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
    const writerFacade = new FirestoreDocumentWriterFacade(new MockCollectionReference({}).doc('documentId'))
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
    const writerFacade = new FirestoreDocumentWriterFacade(new MockCollectionReference({}).doc('documentId')).transaction()
    const result = writerFacade.set({})
    await flushPromises()
    expect(FirestoreRepository.set).toHaveBeenCalled()
    expect(mockSetter.mock.calls[0][0].isTransaction).toBeTruthy()
    expect(mockSetter.mock.calls[0][0].merge).toBeFalsy()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()
    done()
  })
})
