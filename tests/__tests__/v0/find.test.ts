import { FirestoreService } from '../../../src/v0/service/index'
import { findFirestore } from '../../../src/v0/find'
import { firestore } from '../../mocks/firebase'
jest.mock('../../../src/v0/service/index')

describe('find', () => {
  it('find method called', async () => {
    await findFirestore({ ref: firestore.collection('/test').doc('testId') })

    expect(FirestoreService.find).toHaveBeenCalled()
  })

  it('findAll method called', async () => {
    await findFirestore({ ref: firestore.collection('/test') })

    expect(FirestoreService.findAll).toHaveBeenCalled()
  })
})
