import { transactionOfSet } from '../../../../src/repositories/helpers'
import { MockDocumentReference } from '../../../mocks/mock-document-reference'
import { MockDocumentSnapshot } from '../../../mocks/mock-document-snapshot'
import { MockTransaction } from '../../../mocks/mock-transaction'
import { AppError } from '../../../../src/models'
import * as flushPromises from 'flush-promises'

describe('transactionOfSet', () => {
  it('set succeeded', async (done) => {
    const transaction = new MockTransaction()
    const mockSet = jest.fn()
    transaction.set = mockSet
    const result = await transactionOfSet({
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
    expect(result).toBeUndefined()
    expect(transaction.set).toHaveBeenCalled()
    jest.clearAllMocks()
    done()
  })

  it('error occured', async (done) => {
    const transaction = new MockTransaction() as firebase.firestore.Transaction
    const errorHandler = jest.fn(() => ({ message: 'error' } as AppError))
    const result = await transactionOfSet({
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
    expect(result).toHaveProperty('message')
    expect(errorHandler).toHaveBeenCalled()
    jest.clearAllMocks()
    done()
  })
})
