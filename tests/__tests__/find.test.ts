import { FirestoreService } from '../../src/service/index'
import { findFirestore } from '../../src/find'
import { firestore } from '../mocks/firebase'
jest.mock('../../src/service/index')

describe('find', () => {
  it('find method called', () => {
    findFirestore({ ref: firestore.collection('/test').doc('testId') })

    expect(FirestoreService.find).toHaveBeenCalled()
  })

  it('findAll method called', () => {
    findFirestore({ ref: firestore.collection('/test') })

    expect(FirestoreService.findAll).toHaveBeenCalled()
  })
})
