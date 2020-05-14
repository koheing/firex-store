import { FirestoreService } from '../../../../src/v0/service/index'
import { MockDocumentReference } from '../../../mocks/mock-document-reference'
import { MockDocumentSnapshot } from '../../../mocks/mock-document-snapshot'
import { MockQueryReference } from '../../../mocks/mock-query-reference'
import { MockQuerySnapshot } from '../../../mocks/mock-query-snapshot'

describe('FirestoreService', () => {
  it('find: return vaule', async (done) => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    ) as firebase.firestore.DocumentReference
    const errorHandler = (error?: any) => jest.fn()
    const completionHandler = jest.fn()
    const result = await FirestoreService.find({
      ref,
      errorHandler,
      completionHandler,
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
    const result = await FirestoreService.find({
      ref,
      errorHandler,
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
    const result = await FirestoreService.find({
      ref,
      errorHandler,
      completionHandler,
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
    const result = await FirestoreService.findAll({
      ref,
      completionHandler,
    })
    expect(result[0].count).toEqual(0)
    expect(completionHandler).toHaveBeenCalled()
    done()
  })

  it('findAll: error occured', async (done) => {
    const ref = new MockQueryReference(
      Promise.reject({ message: 'test error' } as Error)
    ) as firebase.firestore.Query
    const errorHandler = jest.fn()
    const result = await FirestoreService.findAll({
      ref,
      errorHandler,
    })
    expect(errorHandler).toHaveBeenCalled()
    done()
  })

  it('findAll: return null . querySnapshot is null', async (done) => {
    const ref = new MockQueryReference(
      Promise.resolve(new MockQuerySnapshot(true))
    ) as firebase.firestore.Query
    const completionHandler = jest.fn()
    const result = await FirestoreService.findAll({
      ref,
      completionHandler,
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
    const result = await FirestoreService.findAll({
      ref,
      completionHandler,
    })
    expect(result).toBeNull()
    expect(completionHandler).toHaveBeenCalled()
    done()
  })
})
