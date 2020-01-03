import { FirestoreRepository } from '../../../src/repositories'
import { MockDocumentReference } from '../../mocks/mock-document-reference'
import { MockDocumentSnapshot } from '../../mocks/mock-document-snapshot'
import { MockQueryReference } from '../../mocks/mock-query-reference'
import { MockQuerySnapshot } from '../../mocks/mock-query-snapshot'
import { MockCollectionReference } from '../../mocks/mock-collection-reference'
import * as flushPromises from 'flush-promises'
import {
  FirestoreFinder,
  FirestoreSubscriber,
  FirestoreAdder,
  FirestoreSetter,
  FirestoreMergeSetter
} from '../../../src/services'
import { FirestoreMapper } from '../../../src/models'

describe('FirestoreRepository', () => {
  class MockModel extends FirestoreMapper {
    static fromJson(data: any) {
      console.log('mapper')
    }
  }
  it('find: return vaule', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    ) as firebase.firestore.DocumentReference
    const errorHandler = (error?: any) => jest.fn()
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.find({
      ref,
      errorHandler,
      completionHandler
    })
    expect(result.name).toEqual('test')
    expect(completionHandler).toHaveBeenCalled()
    done()
  })

  it('find: error occured', async (done) => {
    const ref = new MockDocumentReference(
      Promise.reject({ message: 'test error' } as Error)
    ) as firebase.firestore.DocumentReference
    const errorHandler = jest.fn()
    const result = await FirestoreRepository.find({
      ref,
      errorHandler
    })
    expect(errorHandler).toHaveBeenCalled()
    done()
  })

  it('find: return null', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot(false, null))
    ) as firebase.firestore.DocumentReference
    const errorHandler = (error?: any) => jest.fn()
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.find({
      ref,
      errorHandler,
      completionHandler
    })
    expect(result).toBeNull()
    expect(completionHandler).toHaveBeenCalled()
    done()
  })

  it('findAll: return vaule', async (done) => {
    const ref = new MockQueryReference(
      Promise.resolve(new MockQuerySnapshot())
    ) as firebase.firestore.Query
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.findAll({
      ref,
      completionHandler
    })
    if (result instanceof Array) {
      expect(result[1].count).toEqual(1)
    }
    expect(completionHandler).toHaveBeenCalled()
    done()
  })

  it('findAll: error occured', async (done) => {
    const ref = new MockQueryReference(
      Promise.reject({ message: 'test error' } as Error)
    ) as firebase.firestore.Query
    const errorHandler = jest.fn()
    const result = await FirestoreRepository.findAll({
      ref,
      errorHandler
    })
    expect(errorHandler).toHaveBeenCalled()
    done()
  })

  it('findAll: return null . querySnapshot is null', async (done) => {
    const ref = new MockQueryReference(
      Promise.resolve(new MockQuerySnapshot(true))
    ) as firebase.firestore.Query
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.findAll({
      ref,
      completionHandler
    })
    expect(result).toBeNull()
    expect(completionHandler).toHaveBeenCalled()
    done()
  })

  it('findAll: return null . documentSnapshot is null', async (done) => {
    const ref = new MockQueryReference(
      Promise.resolve(
        new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
      )
    ) as firebase.firestore.Query
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.findAll({
      ref,
      completionHandler
    })
    expect(result).toBeNull()
    expect(completionHandler).toHaveBeenCalled()
    done()
  })

  it('add: return documentId', async (done) => {
    const data = {} as any
    const ref = new MockCollectionReference(
      data
    ) as firebase.firestore.CollectionReference
    const mapper = (data: any) => ({ name: data.name })

    const result = await FirestoreRepository.add({
      data: { name: 'test' },
      ref,
      mapper
    })
    expect(result).toEqual('testDoc1')
    done()
  })

  it('add: return error', async (done) => {
    const data = {} as any
    const ref = new MockCollectionReference(data, {
      message: 'error occured'
    }) as firebase.firestore.CollectionReference
    const mapper = (data: any) => ({ name: data.name })
    const errorHandler = jest.fn(() => ({ message: 'error occured' } as Error))

    const result = await FirestoreRepository.add({
      data: { name: 'test' },
      ref,
      mapper,
      errorHandler
    })
    expect(errorHandler).toHaveBeenCalled()
    expect(result).toHaveProperty('message')
    done()
  })

  it('set: no transaction, return void', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    ) as firebase.firestore.DocumentReference
    const mapper = (data: any) => ({ name: data.name })
    const result = await FirestoreRepository.set({
      data: { name: 'test' },
      ref,
      merge: false,
      isTransaction: false,
      mapper
    })
    expect(result).toBeUndefined()
    done()
  })

  it('set: no transaction, return error', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot()),
      { setReturnData: Promise.reject({ message: 'error occured' } as Error) }
    ) as firebase.firestore.DocumentReference
    const mapper = (data: any) => ({ name: data.name })
    const errorHandler = jest.fn(() => ({ message: 'error occured' } as Error))
    const result = await FirestoreRepository.set({
      data: { name: 'test' },
      ref,
      merge: false,
      isTransaction: false,
      mapper,
      errorHandler
    })
    expect(result).toHaveProperty('message')
    done()
  })

  it('set: transaction, return void', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    ) as firebase.firestore.DocumentReference
    const mapper = (data: any) => ({ name: data.name })
    const result = await FirestoreRepository.set({
      data: { name: 'test' },
      ref,
      merge: false,
      isTransaction: true,
      mapper
    })
    expect(result).toBeUndefined()
    done()
  })

  it('delete: no transaction, return error', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot()),
      {
        deleteReturnData: Promise.reject({ message: 'error occured' } as Error)
      }
    ) as firebase.firestore.DocumentReference
    expect(ref.delete()).toBeInstanceOf(Promise)
    const result = await FirestoreRepository.delete({
      ref,
      isTransaction: false
    })
    await flushPromises()
    expect(result).toHaveProperty('message')
    done()
  })

  it('delete: transaction, return void', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    ) as firebase.firestore.DocumentReference
    const result = await FirestoreRepository.delete({
      ref,
      isTransaction: true
    })
    expect(result).toBeUndefined()
    done()
  })

  it('findAll and find: fromJson called', async (done) => {
    const spyMock = jest.spyOn(FirestoreRepository, 'findAll')
    const ref = new MockQueryReference(
      Promise.resolve(
        new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
      )
    ) as firebase.firestore.Query
    await FirestoreFinder.from(ref)
      .mapOf(MockModel)
      .find()
    if (spyMock.mock.calls[0][0].mapper) {
      expect(spyMock.mock.calls[0][0].mapper.name).toEqual('fromJson')
    }
    jest.clearAllMocks()
    done()
  })

  it('findAll and find: fromJson not called', async (done) => {
    const spyMock = jest.spyOn(FirestoreRepository, 'findAll')
    const ref = new MockQueryReference(
      Promise.resolve(
        new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
      )
    ) as firebase.firestore.Query
    await FirestoreFinder.from(ref)
      .mapOf(MockModel)
      .find({ mapper: (data: any) => ({ count: data.count }) })
    if (spyMock.mock.calls[0][0].mapper) {
      expect(spyMock.mock.calls[0][0].mapper.name).toEqual('fromJson')
    }
    jest.clearAllMocks()
    done()
  })

  it('subscribeAll and subscribe: fromJson called', () => {
    const spyMock = jest.spyOn(FirestoreRepository, 'subscribeAll')
    const ref = new MockQueryReference(
      Promise.resolve(
        new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
      )
    ) as firebase.firestore.Query
    FirestoreSubscriber.from(ref)
      .mapOf(MockModel)
      .bindTo('test')
      .subscribe({}, jest.fn())
    if (spyMock.mock.calls[0][0].mapper) {
      expect(spyMock.mock.calls[0][0].mapper.name).toEqual('fromJson')
    }
    jest.clearAllMocks()
  })

  it('subscribeAll and subscribe: fromJson not called', () => {
    const spyMock = jest.spyOn(FirestoreRepository, 'subscribeAll')
    const ref = new MockQueryReference(
      Promise.resolve(
        new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
      )
    ) as firebase.firestore.Query
    FirestoreSubscriber.from(ref)
      .mapOf(MockModel)
      .bindTo('test')
      .subscribe({}, jest.fn(), {
        mapper: (data: any) => ({ count: data.count })
      })
    if (spyMock.mock.calls[0][0].mapper) {
      expect(spyMock.mock.calls[0][0].mapper.name).toEqual('fromJson')
    }
    jest.clearAllMocks()
  })

  it('add: toJson called', () => {
    const spyMock = jest.spyOn(FirestoreRepository, 'add')
    const ref = new MockCollectionReference(
      Promise.resolve(
        new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
      )
    ) as firebase.firestore.CollectionReference
    FirestoreAdder.to(ref)
      .mapOf(MockModel)
      .add({}, { errorHandler: (error: any) => error })
    if (spyMock.mock.calls[0][0].mapper) {
      expect(spyMock.mock.calls[0][0].mapper.name).toEqual('toJson')
    }
    jest.clearAllMocks()
  })

  it('set: toJson called', () => {
    const spyMock = jest.spyOn(FirestoreRepository, 'set')
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    ) as firebase.firestore.DocumentReference
    FirestoreSetter.to(ref)
      .mapOf(MockModel)
      .set({}, { errorHandler: (error: any) => error })
    if (spyMock.mock.calls[0][0].mapper) {
      expect(spyMock.mock.calls[0][0].mapper.name).toEqual('toJson')
    }
    jest.clearAllMocks()
  })

  it('mergeSet: toJson called', () => {
    const spyMock = jest.spyOn(FirestoreRepository, 'set')
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    ) as firebase.firestore.DocumentReference
    FirestoreMergeSetter.to(ref)
      .mapOf(MockModel)
      .mergeSet({}, { errorHandler: (error: any) => error })
    if (spyMock.mock.calls[0][0].mapper) {
      expect(spyMock.mock.calls[0][0].mapper.name).toEqual('toJson')
    }
    jest.clearAllMocks()
  })

  it('subscribeOnce: afterMutationCalled, completionHandler, errorHandler, callMutation called', async (done) => {
    const ref = new MockQueryReference(
      Promise.reject({ message: 'test error' } as Error)
    ) as firebase.firestore.Query
    const errorHandler = jest.fn()
    const afterMutationCalled = jest.fn()
    const completionHandler = jest.fn()
    const callMutation = jest.fn()
    const result = await FirestoreRepository.subscribeOnce({
      ref,
      errorHandler,
      callMutation,
      statePropName: '',
      afterMutationCalled,
      completionHandler
    })
    expect(errorHandler).toHaveBeenCalled()
    expect(afterMutationCalled).toHaveBeenCalled()
    expect(completionHandler).toHaveBeenCalled()
    expect(callMutation).toHaveBeenCalled()

    jest.clearAllMocks()
    done()
  })

  it('subscribeOnce: error occured', async (done) => {
    const ref = new MockQueryReference(
      Promise.resolve(
        new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
      )
    ) as firebase.firestore.Query
    const mapper = (data: any) => ({ ...data })
    const errorHandler = jest.fn()
    FirestoreRepository.findAll = ({
      errorHandler,
      ref,
      completionHandler,
      mapper
    }) => Promise.resolve(new Error('error occured'))
    const result = await FirestoreRepository.subscribeOnce({
      ref,
      errorHandler,
      statePropName: '',
      callMutation: jest.fn()
    })
    if (result instanceof Error) {
      expect(result).toHaveProperty('message')
    }

    jest.clearAllMocks()
    done()
  })

  it('subscribeOnce: return null', async (done) => {
    const ref = new MockQueryReference(
      Promise.resolve(
        new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
      )
    ) as firebase.firestore.Query
    const errorHandler = jest.fn()
    FirestoreRepository.findAll = ({ ref, completionHandler, errorHandler }) =>
      Promise.resolve(null)
    const result = await FirestoreRepository.subscribeOnce({
      ref,
      errorHandler,
      statePropName: '',
      callMutation: jest.fn()
    })
    expect(result).toBeNull()
    jest.clearAllMocks()
    done()
  })
})
