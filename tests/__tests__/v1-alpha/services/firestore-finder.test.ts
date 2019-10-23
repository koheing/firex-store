import { FirestoreFinder } from '../../../../src/v1-alpha/services'
import { FirestoreRepository } from '../../../../src/v1-alpha/repositories/index'
import { firestore } from '../../../mocks/firebase'
jest.mock('../../../../src/v1-alpha/repositories/index')

describe('FirestoreFinder', () => {
  it('find method called', () => {
    FirestoreFinder.from(
      firestore.collection('comments').doc('commentId')
    ).find()

    expect(FirestoreRepository.find).toHaveBeenCalled()
  })

  it('findAll method called', () => {
    FirestoreFinder.from(firestore.collection('comments')).find()

    expect(FirestoreRepository.findAll).toHaveBeenCalled()
  })
})
