import { FirestoreRepository } from '../../../src/repositories'
import { FirestoreMapper } from '../../../src/models'
import * as RepositoryHelpers from '../../../src/repositories/helpers'

describe('FirestoreRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  class MockModel extends FirestoreMapper {
    static fromJson(data: any) {
      console.log('mapper')
    }
  }
  const mockDocumentSnapshot = {
    id: 'chara001',
    exists: true,
    data: jest.fn(() => ({ name: 'sans' }))
  }

  const mockQuerySnapshot = {
    empty: false,
    docs: [
      mockDocumentSnapshot,
      {
        id: 'chara002',
        exists: true,
        data: jest.fn(() => ({ name: 'papyrus' }))
      }
    ]
  }

  it('find: return vaule', async () => {
    const ref = {
      get: () => Promise.resolve(mockDocumentSnapshot)
    }
    const errorHandler = (error?: any) => jest.fn()
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.find({
      // @ts-ignore
      ref,
      errorHandler,
      completionHandler
    })
    expect(result.name).toEqual('sans')
    expect(completionHandler).toHaveBeenCalled()
  })

  it('find: return null', async () => {
    const ref = {
      get: () => Promise.resolve({ ...mockDocumentSnapshot, exists: false })
    }

    const result = await FirestoreRepository.find({
      // @ts-ignore
      ref
    })
    expect(result).toBeNull()
  })

  it('find: error occured', async () => {
    const ref = {
      get: () => Promise.reject(new Error('find error'))
    }

    const errorHandler = jest.fn()

    // @ts-ignore
    await FirestoreRepository.find({ ref, errorHandler })

    expect(errorHandler).toHaveBeenCalled()
  })

  it('findAll: return vaule', async () => {
    const ref = {
      get: () => Promise.resolve(mockQuerySnapshot)
    }
    const errorHandler = (error?: any) => jest.fn()
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.findAll({
      // @ts-ignore
      ref,
      errorHandler,
      completionHandler
    })
    expect(result.length).toEqual(2)
    expect(completionHandler).toHaveBeenCalled()
  })

  it('findAll: return null', async () => {
    const ref = {
      get: () => Promise.resolve({ ...mockQuerySnapshot, empty: true })
    }

    const result = await FirestoreRepository.findAll({
      // @ts-ignore
      ref
    })
    expect(result).toBeNull()
  })

  it('findAll: return null', async () => {
    const ref = {
      get: () =>
        Promise.resolve({
          ...mockQuerySnapshot,
          docs: mockQuerySnapshot.docs.map((it) => ({ ...it, exists: false }))
        })
    }

    const result = await FirestoreRepository.findAll({
      // @ts-ignore
      ref
    })
    expect(result).toBeNull()
  })

  it('findAll: error occured', async () => {
    const ref = {
      get: () => Promise.reject(new Error('find error'))
    }

    const errorHandler = jest.fn()

    // @ts-ignore
    await FirestoreRepository.findAll({ ref, errorHandler })

    expect(errorHandler).toHaveBeenCalled()
  })

  it('add: return documentId', async () => {
    const ref = {
      add: (data: any) => Promise.resolve({ ...data, id: 'chara002' })
    }

    const result = await FirestoreRepository.add({
      data: { name: 'ariel' },
      // @ts-ignore
      ref,
      mapper: (it) => it
    })

    expect(result).toEqual('chara002')
  })

  it('add: error occured', async () => {
    const error = new Error('add error')
    const ref = {
      add: (data: any) => Promise.reject(error)
    }

    const result = await FirestoreRepository.add({
      data: { name: 'ariel' },
      // @ts-ignore
      ref,
      mapper: (it) => it
    })

    expect(result).toEqual(error)
  })

  it('set: no transaction, return void', async () => {
    const ref = {
      set: (data: any, options?: any) => Promise.resolve()
    }

    const result = await FirestoreRepository.set({
      data: { name: 'ariel' },
      merge: false,
      isTransaction: false,
      // @ts-ignore
      ref,
      mapper: (it) => it
    })

    expect(result).toBeUndefined()
  })

  it('set: no transaction, error occured', async () => {
    const error = new Error('set error')
    const ref = {
      set: (data: any, options?: any) => Promise.reject(error)
    }

    const result = await FirestoreRepository.set({
      data: { name: 'ariel' },
      merge: false,
      isTransaction: false,
      // @ts-ignore
      ref,
      mapper: (it) => it
    })

    expect(result).toEqual(error)
  })

  it('set: with transaction, return void', async () => {
    const mockTransaction = jest.fn()
    const transactionOfSetOrMergeSet =
      RepositoryHelpers.transactionOfSetOrMergeSet

    // @ts-ignore
    RepositoryHelpers.transactionOfSetOrMergeSet = mockTransaction
    const ref = {
      set: (data: any, options?: any) => Promise.resolve(),
      firestore: {
        runTransaction: (runTransaction: any) => {
          runTransaction()
        }
      }
    }

    await FirestoreRepository.set({
      data: { name: 'ariel' },
      merge: false,
      isTransaction: true,
      // @ts-ignore
      ref,
      mapper: (it) => it
    })

    // @ts-ignore
    RepositoryHelpers.transactionOfSetOrMergeSet = transactionOfSetOrMergeSet

    expect(mockTransaction).toHaveBeenCalled()
  })

  // it('set: no transaction, return void', async (done) => {
  //   const ref = new MockDocumentReference(
  //     Promise.resolve(new MockDocumentSnapshot())
  //   ) as firebase.firestore.DocumentReference
  //   const mapper = (data: any) => ({ name: data.name })
  //   const result = await FirestoreRepository.set({
  //     data: { name: 'test' },
  //     ref,
  //     merge: false,
  //     isTransaction: false,
  //     mapper
  //   })
  //   expect(result).toBeUndefined()
  //   done()
  // })

  // it('set: no transaction, return error', async (done) => {
  //   const ref = new MockDocumentReference(
  //     Promise.resolve(new MockDocumentSnapshot()),
  //     { setReturnData: Promise.reject({ message: 'error occured' } as Error) }
  //   ) as firebase.firestore.DocumentReference
  //   const mapper = (data: any) => ({ name: data.name })
  //   const errorHandler = jest.fn(() => ({ message: 'error occured' } as Error))
  //   const result = await FirestoreRepository.set({
  //     data: { name: 'test' },
  //     ref,
  //     merge: false,
  //     isTransaction: false,
  //     mapper,
  //     errorHandler
  //   })
  //   expect(result).toHaveProperty('message')
  //   done()
  // })

  // it('set: transaction, return void', async (done) => {
  //   const ref = new MockDocumentReference(
  //     Promise.resolve(new MockDocumentSnapshot())
  //   ) as firebase.firestore.DocumentReference
  //   const mapper = (data: any) => ({ name: data.name })
  //   const result = await FirestoreRepository.set({
  //     data: { name: 'test' },
  //     ref,
  //     merge: false,
  //     isTransaction: true,
  //     mapper
  //   })
  //   expect(result).toBeUndefined()
  //   done()
  // })

  // it('delete: no transaction, return error', async (done) => {
  //   const ref = new MockDocumentReference(
  //     Promise.resolve(new MockDocumentSnapshot()),
  //     {
  //       deleteReturnData: Promise.reject({ message: 'error occured' } as Error)
  //     }
  //   ) as firebase.firestore.DocumentReference
  //   expect(ref.delete()).toBeInstanceOf(Promise)
  //   const result = await FirestoreRepository.delete({
  //     ref,
  //     isTransaction: false
  //   })
  //   await flushPromises()
  //   expect(result).toHaveProperty('message')
  //   done()
  // })

  // it('delete: transaction, return void', async (done) => {
  //   const ref = new MockDocumentReference(
  //     Promise.resolve(new MockDocumentSnapshot())
  //   ) as firebase.firestore.DocumentReference
  //   const result = await FirestoreRepository.delete({
  //     ref,
  //     isTransaction: true
  //   })
  //   expect(result).toBeUndefined()
  //   done()
  // })

  // it('findAll and find: fromJson called', async (done) => {
  //   const spyMock = jest.spyOn(FirestoreRepository, 'findAll')
  //   const ref = new MockQueryReference(
  //     Promise.resolve(
  //       new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
  //     )
  //   ) as firebase.firestore.Query
  //   await FirestoreFinder.from(ref)
  //     .mapOf(MockModel)
  //     .find()
  //   if (spyMock.mock.calls[0][0].mapper) {
  //     expect(spyMock.mock.calls[0][0].mapper.name).toEqual('fromJson')
  //   }
  //   jest.clearAllMocks()
  //   done()
  // })

  // it('findAll and find: fromJson not called', async (done) => {
  //   const spyMock = jest.spyOn(FirestoreRepository, 'findAll')
  //   const ref = new MockQueryReference(
  //     Promise.resolve(
  //       new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
  //     )
  //   ) as firebase.firestore.Query
  //   await FirestoreFinder.from(ref)
  //     .mapOf(MockModel)
  //     .find({ mapper: (data: any) => ({ count: data.count }) })
  //   if (spyMock.mock.calls[0][0].mapper) {
  //     expect(spyMock.mock.calls[0][0].mapper.name).toEqual('fromJson')
  //   }
  //   jest.clearAllMocks()
  //   done()
  // })

  // it('subscribeAll and subscribe: fromJson called', () => {
  //   const spyMock = jest.spyOn(FirestoreRepository, 'subscribeAll')
  //   const ref = new MockQueryReference(
  //     Promise.resolve(
  //       new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
  //     )
  //   ) as firebase.firestore.Query
  //   FirestoreSubscriber.from(ref)
  //     .mapOf(MockModel)
  //     .bindTo('test')
  //     .subscribe({}, jest.fn())
  //   if (spyMock.mock.calls[0][0].mapper) {
  //     expect(spyMock.mock.calls[0][0].mapper.name).toEqual('fromJson')
  //   }
  //   jest.clearAllMocks()
  // })

  // it('subscribeAll and subscribe: fromJson not called', () => {
  //   const spyMock = jest.spyOn(FirestoreRepository, 'subscribeAll')
  //   const ref = new MockQueryReference(
  //     Promise.resolve(
  //       new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
  //     )
  //   ) as firebase.firestore.Query
  //   FirestoreSubscriber.from(ref)
  //     .mapOf(MockModel)
  //     .bindTo('test')
  //     .subscribe({}, jest.fn(), {
  //       mapper: (data: any) => ({ count: data.count })
  //     })
  //   if (spyMock.mock.calls[0][0].mapper) {
  //     expect(spyMock.mock.calls[0][0].mapper.name).toEqual('fromJson')
  //   }
  //   jest.clearAllMocks()
  // })

  // it('add: toJson called', () => {
  //   const spyMock = jest.spyOn(FirestoreRepository, 'add')
  //   const ref = new MockCollectionReference(
  //     Promise.resolve(
  //       new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
  //     )
  //   ) as firebase.firestore.CollectionReference
  //   FirestoreAdder.to(ref)
  //     .mapOf(MockModel)
  //     .add({}, { errorHandler: (error: any) => error })
  //   if (spyMock.mock.calls[0][0].mapper) {
  //     expect(spyMock.mock.calls[0][0].mapper.name).toEqual('toJson')
  //   }
  //   jest.clearAllMocks()
  // })

  // it('set: toJson called', () => {
  //   const spyMock = jest.spyOn(FirestoreRepository, 'set')
  //   const ref = new MockDocumentReference(
  //     Promise.resolve(new MockDocumentSnapshot())
  //   ) as firebase.firestore.DocumentReference
  //   FirestoreSetter.to(ref)
  //     .mapOf(MockModel)
  //     .set({}, { errorHandler: (error: any) => error })
  //   if (spyMock.mock.calls[0][0].mapper) {
  //     expect(spyMock.mock.calls[0][0].mapper.name).toEqual('toJson')
  //   }
  //   jest.clearAllMocks()
  // })

  // it('mergeSet: toJson called', () => {
  //   const spyMock = jest.spyOn(FirestoreRepository, 'set')
  //   const ref = new MockDocumentReference(
  //     Promise.resolve(new MockDocumentSnapshot())
  //   ) as firebase.firestore.DocumentReference
  //   FirestoreMergeSetter.to(ref)
  //     .mapOf(MockModel)
  //     .mergeSet({}, { errorHandler: (error: any) => error })
  //   if (spyMock.mock.calls[0][0].mapper) {
  //     expect(spyMock.mock.calls[0][0].mapper.name).toEqual('toJson')
  //   }
  //   jest.clearAllMocks()
  // })

  // it('subscribeOnce: afterMutationCalled, completionHandler, errorHandler, callMutation called', async (done) => {
  //   const ref = new MockQueryReference(
  //     Promise.reject({ message: 'test error' } as Error)
  //   ) as firebase.firestore.Query
  //   const errorHandler = jest.fn()
  //   const afterMutationCalled = jest.fn()
  //   const completionHandler = jest.fn()
  //   const callMutation = jest.fn()
  //   const result = await FirestoreRepository.subscribeOnce({
  //     ref,
  //     errorHandler,
  //     callMutation,
  //     statePropName: '',
  //     afterMutationCalled,
  //     completionHandler
  //   })
  //   expect(errorHandler).toHaveBeenCalled()
  //   expect(afterMutationCalled).toHaveBeenCalled()
  //   expect(completionHandler).toHaveBeenCalled()
  //   expect(callMutation).toHaveBeenCalled()

  //   jest.clearAllMocks()
  //   done()
  // })

  // it('subscribeOnce: error occured', async (done) => {
  //   const ref = new MockQueryReference(
  //     Promise.resolve(
  //       new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
  //     )
  //   ) as firebase.firestore.Query
  //   const mapper = (data: any) => ({ ...data })
  //   const errorHandler = jest.fn()
  //   FirestoreRepository.findAll = ({
  //     errorHandler,
  //     ref,
  //     completionHandler,
  //     mapper
  //   }) => Promise.resolve(new Error('error occured'))
  //   const result = await FirestoreRepository.subscribeOnce({
  //     ref,
  //     errorHandler,
  //     statePropName: '',
  //     callMutation: jest.fn()
  //   })
  //   if (result instanceof Error) {
  //     expect(result).toHaveProperty('message')
  //   }

  //   jest.clearAllMocks()
  //   done()
  // })

  // it('subscribeOnce: return null', async (done) => {
  //   const ref = new MockQueryReference(
  //     Promise.resolve(
  //       new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
  //     )
  //   ) as firebase.firestore.Query
  //   const errorHandler = jest.fn()
  //   FirestoreRepository.findAll = ({ ref, completionHandler, errorHandler }) =>
  //     Promise.resolve(null)
  //   const result = await FirestoreRepository.subscribeOnce({
  //     ref,
  //     errorHandler,
  //     statePropName: '',
  //     callMutation: jest.fn()
  //   })
  //   expect(result).toBeNull()
  //   jest.clearAllMocks()
  //   done()
  // })
})
