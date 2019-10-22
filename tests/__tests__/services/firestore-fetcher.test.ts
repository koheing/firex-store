import { FirestoreFetcher } from '../../../src/v1-alpha/services'
import { FirestoreRepository } from '../../../src/v1-alpha/repositories/index'
import { firestore } from '../../mocks/firebase'
jest.mock('../../../src/v1-alpha/repositories/index')

describe('FirestoreFetcher', () => {
  it('find method called', () => {
    FirestoreFetcher.where(
      firestore.collection('comments').doc('commentId')
    ).fetch()

    expect(FirestoreRepository.find).toHaveBeenCalled()
  })

  it('findAll method called', () => {
    FirestoreFetcher.where(firestore.collection('comments')).fetch()

    expect(FirestoreRepository.findAll).toHaveBeenCalled()
  })
})
