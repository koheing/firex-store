import { FirestoreService } from '../../../src/service/index'
import { MockDocumentReference } from '../../mocks/mock-document-reference'
import { MockDocumentSnapshot } from '../../mocks/mock-document-snapshot'
import { MockQueryReference } from '../../mocks/mock-query-reference'
import { MockQuerySnapshot } from '../../mocks/mock-query-snapshot'

describe('FirestoreService', () => {
  it('find: return vaule', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    )
    const errorHandler = (error?: any) => jest.fn()
    const onCompleted = jest.fn()
    const result = await FirestoreService.find({
      ref,
      errorHandler,
      onCompleted
    })
    expect(result.name).toEqual('test')
    expect(onCompleted).toHaveBeenCalled()
    done()
  })

  it('find: error occured', async (done) => {
    const ref = new MockDocumentReference(
      Promise.reject({ message: 'test error' } as Error)
    )
    const errorHandler = jest.fn()
    const result = await FirestoreService.find({
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
    const onCompleted = jest.fn()
    const result = await FirestoreService.find({
      ref,
      errorHandler,
      onCompleted
    })
    expect(result).toBeNull()
    expect(onCompleted).toHaveBeenCalled()
    done()
  })

  it('findAll: return vaule', async (done) => {
    const ref = new MockQueryReference(Promise.resolve(new MockQuerySnapshot()))
    const onCompleted = jest.fn()
    const result = await FirestoreService.findAll({
      ref,
      onCompleted
    })
    expect(result[0].count).toEqual(0)
    expect(onCompleted).toHaveBeenCalled()
    done()
  })

  it('findAll: error occured', async (done) => {
    const ref = new MockQueryReference(
      Promise.reject({ message: 'test error' } as Error)
    )
    const errorHandler = jest.fn()
    const result = await FirestoreService.findAll({
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
    const onCompleted = jest.fn()
    const result = await FirestoreService.findAll({
      ref,
      onCompleted
    })
    expect(result).toBeNull()
    expect(onCompleted).toHaveBeenCalled()
    done()
  })

  it('findAll: return null . documentSnapshot is null', async (done) => {
    const ref = new MockQueryReference(
      Promise.resolve(
        new MockQuerySnapshot(false, [new MockDocumentSnapshot(false, null)])
      )
    )
    const onCompleted = jest.fn()
    const result = await FirestoreService.findAll({
      ref,
      onCompleted
    })
    expect(result).toBeNull()
    expect(onCompleted).toHaveBeenCalled()
    done()
  })
})
