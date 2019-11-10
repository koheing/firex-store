import { FirestoreRepository } from '../../../src/repositories'
import { MockDocumentReference } from '../../mocks/mock-document-reference'
import { MockDocumentSnapshot } from '../../mocks/mock-document-snapshot'
import { MockQueryReference } from '../../mocks/mock-query-reference'
import { MockQuerySnapshot } from '../../mocks/mock-query-snapshot'
import { MockCollectionReference } from '../../mocks/mock-collection-reference'

describe('FirestoreService', () => {
  it('find: return vaule', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    )
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
    )
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
    )
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
    const ref = new MockQueryReference(Promise.resolve(new MockQuerySnapshot()))
    const completionHandler = jest.fn()
    const result = await FirestoreRepository.findAll({
      ref,
      completionHandler
    })
    expect(result[0].count).toEqual(0)
    expect(completionHandler).toHaveBeenCalled()
    done()
  })

  it('findAll: error occured', async (done) => {
    const ref = new MockQueryReference(
      Promise.reject({ message: 'test error' } as Error)
    )
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
    )
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
    )
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
    const ref = new MockCollectionReference(data)
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
    const ref = new MockCollectionReference(data, { message: 'error occured' })
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
    )
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
    )
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
    )
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
})
