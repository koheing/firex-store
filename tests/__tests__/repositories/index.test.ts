/* eslint-disable no-import-assign */
import { FirestoreRepository } from '../../../src/repositories'
import {
  transactionOfSetOrMergeSet,
  transacitonOfDelete,
} from '../../../src/repositories/helpers/transactions'
import { isDocumentRef } from '../../../src/utils/is-document-ref'

jest.mock('../../../src/repositories/helpers/transactions')
jest.mock('../../../src/utils/is-document-ref')

describe('FirestoreRepository', () => {
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

  it('find: return vaule', async () => {
    const ref = {
      get: () => Promise.resolve(mockDocumentSnapshot),
    }
    const errorHandler = (error?: any) => jest.fn()
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.find({
      // @ts-ignore
      ref,
      errorHandler,
      completionHandler,
    })
    expect(result.name).toEqual('sans')
    expect(completionHandler).toHaveBeenCalled()
  })

  it('find: return null', async () => {
    const ref = {
      get: () => Promise.resolve({ ...mockDocumentSnapshot, exists: false }),
    }

    const result = await FirestoreRepository.find({
      // @ts-ignore
      ref,
    })
    expect(result).toBeNull()
  })

  it('find: error occured', async () => {
    const ref = {
      get: () => Promise.reject(new Error('find error')),
    }

    const errorHandler = jest.fn()

    // @ts-ignore
    await FirestoreRepository.find({ ref, errorHandler })

    expect(errorHandler).toHaveBeenCalled()
  })

  it('findAll: return vaule', async () => {
    const ref = {
      get: () => Promise.resolve(mockQuerySnapshot),
    }
    const errorHandler = (error?: any) => jest.fn()
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.findAll({
      // @ts-ignore
      ref,
      errorHandler,
      completionHandler,
    })
    if (result && Array.isArray(result)) {
      expect(result.length).toEqual(2)
    }
    expect(completionHandler).toHaveBeenCalled()
  })

  it('findAll: return null', async () => {
    const ref = {
      get: () => Promise.resolve({ ...mockQuerySnapshot, empty: true }),
    }

    const result = await FirestoreRepository.findAll({
      // @ts-ignore
      ref,
    })
    expect(result).toBeNull()
  })

  it('findAll: return null', async () => {
    const ref = {
      get: () =>
        Promise.resolve({
          ...mockQuerySnapshot,
          docs: mockQuerySnapshot.docs.map((it) => ({ ...it, exists: false })),
        }),
    }

    const result = await FirestoreRepository.findAll({
      // @ts-ignore
      ref,
    })
    expect(result).toBeNull()
  })

  it('findAll: error occured', async () => {
    const ref = {
      get: () => Promise.reject(new Error('find error')),
    }

    const errorHandler = jest.fn()

    // @ts-ignore
    await FirestoreRepository.findAll({ ref, errorHandler })

    expect(errorHandler).toHaveBeenCalled()
  })

  it('add: return documentId', async () => {
    const ref = {
      add: (data: any) => Promise.resolve({ ...data, id: 'chara002' }),
    }

    const result = await FirestoreRepository.add({
      data: { name: 'ariel' },
      // @ts-ignore
      ref,
      mapper: (it) => it,
    })

    expect(result).toEqual('chara002')
  })

  it('add: error occured', async () => {
    const error = new Error('add error')
    const ref = {
      add: (data: any) => Promise.reject(error),
    }

    const result = await FirestoreRepository.add({
      data: { name: 'ariel' },
      // @ts-ignore
      ref,
      mapper: (it) => it,
    })

    expect(result).toEqual(error)
  })

  it('set: no transaction, return void', async () => {
    const ref = {
      set: (data: any, options?: any) => Promise.resolve(),
    }

    const result = await FirestoreRepository.set({
      data: { name: 'ariel' },
      merge: false,
      isTransaction: false,
      // @ts-ignore
      ref,
      mapper: (it) => it,
    })

    expect(result).toBeUndefined()
  })

  it('set: no transaction, error occured', async () => {
    const error = new Error('set error')
    const ref = {
      set: (data: any, options?: any) => Promise.reject(error),
    }

    const result = await FirestoreRepository.set({
      data: { name: 'ariel' },
      merge: false,
      isTransaction: false,
      // @ts-ignore
      ref,
      mapper: (it) => it,
    })

    expect(result).toEqual(error)
  })

  it('set: with transaction, return void', async () => {
    const mockSetTransaction = transactionOfSetOrMergeSet as jest.Mock
    mockSetTransaction.mockImplementation((...args: any[]) => undefined)
    const ref = {
      set: (data: any, options?: any) => Promise.resolve(),
      firestore: {
        runTransaction: async (runTransaction: any) => {
          await runTransaction()
        },
      },
    }

    await FirestoreRepository.set({
      data: { name: 'ariel' },
      merge: false,
      isTransaction: true,
      // @ts-ignore
      ref,
      mapper: (it) => it,
    })

    expect(mockSetTransaction).toHaveBeenCalled()
  })

  it('delete: no transaction, return error', async () => {
    const ref = {
      delete: () => Promise.resolve(),
    }

    const result = await FirestoreRepository.delete({
      // @ts-ignore
      ref,
      isTransaction: false,
    })

    expect(result).toBeUndefined()
  })

  it('delete: no transaction, error occured', async () => {
    const error = new Error('delete error')
    const ref = {
      delete: () => Promise.reject(error),
    }

    const errorHandler = jest.fn()
    const result = await FirestoreRepository.delete({
      // @ts-ignore
      ref,
      isTransaction: false,
      errorHandler,
    })

    expect(errorHandler).toHaveBeenCalled()
  })

  xit('delete: with transaction, return void', async (done) => {
    const mockDeleteTransaction = transacitonOfDelete as jest.Mock
    mockDeleteTransaction.mockImplementation((...args: any[]) =>
      Promise.resolve()
    )
    const ref = {
      firestore: {
        runTransaction: async (
          transaction: (...args: any[]) => Promise<void>
        ) => {
          await transaction()
        },
      },
    }
    const result = await FirestoreRepository.delete({
      // @ts-ignore
      ref,
      isTransaction: true,
    })
    expect(result).toBeUndefined()
  })

  it('subscribe: succeeded', () => {
    const ref = {
      onSnapshot: (onNext: any) => {
        onNext(mockDocumentSnapshot)
      },
    }

    const mutationHandler = jest.fn((...args: any[]) => undefined)

    FirestoreRepository.subscribe({
      // @ts-ignore
      ref,
      mutationHandler,
    })

    expect(mutationHandler).toHaveBeenCalled()
    expect(mutationHandler.mock.calls[0][0].docId).toEqual('chara001')
  })

  it('subscribe: return null', () => {
    const ref = {
      onSnapshot: (onNext: any) => {
        onNext({ exists: false })
      },
    }

    const notFoundHandler = jest.fn()

    FirestoreRepository.subscribe({
      // @ts-ignore
      ref,
      mutationHandler: jest.fn(),
      notFoundHandler,
    })

    expect(notFoundHandler).toHaveBeenCalled()
  })

  it('subscribe: error occured', () => {
    const ref = {
      onSnapshot: (_: any, onError: any) => {
        onError(new Error('subscribe error'))
      },
    }

    const errorHandler = jest.fn()

    FirestoreRepository.subscribe({
      // @ts-ignore
      ref,
      mutationHandler: jest.fn(),
      errorHandler,
    })

    expect(errorHandler).toHaveBeenCalled()
  })

  it('subscribeAll: succeeded', () => {
    const ref = {
      onSnapshot: (onNext: any) => {
        onNext(mockQuerySnapshot)
      },
    }

    const mutationHandler = jest.fn((...args: any[]) => undefined)

    FirestoreRepository.subscribeAll({
      // @ts-ignore
      ref,
      mutationHandler,
    })

    expect(mutationHandler).toHaveBeenCalled()
    expect(mutationHandler.mock.calls[0][0].docId).toEqual('chara001')
  })

  it('subscribeAll: return null', () => {
    const ref = {
      onSnapshot: (onNext: any) => {
        onNext({ empty: true })
      },
    }

    const notFoundHandler = jest.fn()

    FirestoreRepository.subscribeAll({
      // @ts-ignore
      ref,
      mutationHandler: jest.fn(),
      notFoundHandler,
    })

    expect(notFoundHandler).toHaveBeenCalled()
  })

  it('subscribeAll: error occured', () => {
    const ref = {
      onSnapshot: (_: any, onError: any) => {
        onError(new Error('subscribeAll error'))
      },
    }

    const errorHandler = jest.fn()

    FirestoreRepository.subscribeAll({
      // @ts-ignore
      ref,
      mutationHandler: jest.fn(),
      errorHandler,
    })

    expect(errorHandler).toHaveBeenCalled()
  })

  it('subscribeOnce: succeeded', async () => {
    const mockIsDocumentRef = (isDocumentRef as unknown) as jest.Mock
    mockIsDocumentRef.mockImplementationOnce(() => true)
    const ref = {
      get: () => Promise.resolve(mockDocumentSnapshot),
    }
    const errorHandler = jest.fn()
    const afterMutationCalled = jest.fn()
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.subscribeOnce({
      statePropName: 'charactors',
      // @ts-ignore
      ref,
      callMutation: jest.fn(),
      errorHandler,
      completionHandler,
      afterMutationCalled,
    })

    expect(result.docId).toEqual('chara001')
    expect(errorHandler).not.toHaveBeenCalled()
    expect(afterMutationCalled).toHaveBeenCalled()
    expect(completionHandler).toHaveBeenCalled()
  })
})
