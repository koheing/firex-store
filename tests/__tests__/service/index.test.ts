import { FirestoreService } from '../../../src/service/index'
import { MockDocumentReference } from '../../mocks/mock-document-reference'
import { MockDocumentSnapshot } from '../../mocks/mock-document-snapshot'
import { MockQueryReference } from '../../mocks/mock-query-reference'
import { MockQuerySnapshot } from '../../mocks/mock-query-snapshot'

describe('FirestoreService', () => {
  it('find: return vaule', () => {
    const ref = new MockDocumentReference(
      Promise.resolve(new MockDocumentSnapshot())
    )
    const errorHandler = (error?: Error) => jest.fn()
    const onCompleted = jest.fn()
    FirestoreService.find({
      ref,
      errorHandler,
      onCompleted
    }).then((result) => {
      expect(result.name).toEqual('test')
      expect(onCompleted).toHaveBeenCalled()
    })
  })

  it('find: error occured', () => {
    const ref = new MockDocumentReference(
      Promise.reject({ message: 'test error' } as Error)
    )
    const errorHandler = jest.fn()
    FirestoreService.find({
      ref,
      errorHandler
    }).then((result) => {
      expect(errorHandler).toHaveBeenCalled()
    })
  })

  it('findAll: return vaule', () => {
    const ref = new MockQueryReference(Promise.resolve(new MockQuerySnapshot()))
    const onCompleted = jest.fn()
    FirestoreService.findAll({
      ref,
      onCompleted
    }).then((result) => {
      expect(result[0].count).toEqual(0)
      expect(onCompleted).toHaveBeenCalled()
    })
  })

  it('findAll: error occured', () => {
    const ref = new MockQueryReference(
      Promise.reject({ message: 'test error' } as Error)
    )
    const errorHandler = jest.fn()
    FirestoreService.findAll({
      ref,
      errorHandler
    }).then((result) => {
      expect(errorHandler).toHaveBeenCalled()
    })
  })
})
