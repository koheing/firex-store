import { transactionOfSetOrMergeSet } from '../../../../src/repositories/helpers'
import { MockDocumentReference } from '../../../mocks/mock-document-reference'
import { MockDocumentSnapshot } from '../../../mocks/mock-document-snapshot'
import { MockTransaction } from '../../../mocks/mock-transaction'
import * as flushPromises from 'flush-promises'
import { appErrorTree } from '../../../../src/errors'

describe('transactionOfSetOrMergeSet', () => {
  it('mergeSet error occured', async (done) => {
    const transaction = new MockTransaction()
    const mockSet = jest.fn()
    transaction.set = mockSet
    const result = await transactionOfSetOrMergeSet({
      ref: new MockDocumentReference(
        Promise.resolve(
          new MockDocumentSnapshot(false, { name: 'test', count: 1 })
        )
      ),
      data: { name: 'test' },
      merge: true,
      transaction
    })
    await flushPromises()
    expect(result).not.toBeUndefined()
    if (result) {
      expect(result.message).toEqual(appErrorTree.DATA_EXISTED.message)
    }
    jest.clearAllMocks()
    done()
  })

  it('mergeSet succeeded', async (done) => {
    const transaction = new MockTransaction() as firebase.firestore.Transaction
    const errorHandler = jest.fn(() => appErrorTree.ID_HAS_ALREADY_BEEN_USED)
    const result = await transactionOfSetOrMergeSet({
      ref: new MockDocumentReference(
        Promise.resolve(
          new MockDocumentSnapshot(true, { name: 'test', count: 1 })
        )
      ),
      data: { name: 'test' },
      merge: true,
      transaction,
      errorHandler
    })
    await flushPromises()
    expect(result).toBeUndefined()
    expect(errorHandler).not.toHaveBeenCalled()
    jest.clearAllMocks()
    done()
  })

  it('set error occured', async (done) => {
    const transaction = new MockTransaction()
    const mockSet = jest.fn()
    transaction.set = mockSet
    const result = await transactionOfSetOrMergeSet({
      ref: new MockDocumentReference(
        Promise.resolve(
          new MockDocumentSnapshot(true, { name: 'test', count: 1 })
        )
      ),
      data: { name: 'test' },
      merge: false,
      transaction
    })
    await flushPromises()
    expect(result).not.toBeUndefined()
    if (result) {
      expect(result.message).toEqual(appErrorTree.ID_HAS_ALREADY_BEEN_USED.message)
    }
    jest.clearAllMocks()
    done()
  })

  it('set succeeded', async (done) => {
    const transaction = new MockTransaction()
    const mockSet = jest.fn()
    transaction.set = mockSet
    const errorHandler = jest.fn(() => appErrorTree.ID_HAS_ALREADY_BEEN_USED)
    const documentSnap = new MockDocumentSnapshot(true, undefined)
    documentSnap._data = undefined
    const result = await transactionOfSetOrMergeSet({
      ref: new MockDocumentReference(
        Promise.resolve(
          documentSnap
        )
      ),
      data: { name: 'test' },
      merge: false,
      transaction
    })
    await flushPromises()
    expect(result).toBeUndefined()
    expect(errorHandler).not.toHaveBeenCalled()
    jest.clearAllMocks()
    done()
  })

})
