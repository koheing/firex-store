import { to } from '../../../src/creators'
import {
  FirestoreSetter,
  FirestoreAdder,
  FirestoreMergeSetter
} from '../../../src/services'
import { firestore } from '../../mocks/firebase'

describe('FirestoreWriterServiceFactory', () => {
  it('is FirestoreAdder instance', () => {
    const adder = to(firestore.collection('comments')).newData()
    expect(adder).toBeInstanceOf(FirestoreAdder)
  })

  it('is FirestoreSetter instance', () => {
    const setter = to(firestore.collection('comments').doc('commentId')).newData()
    expect(setter).toBeInstanceOf(FirestoreSetter)
  })

  it('is FirestoreMergeSetter instance', () => {
    const mergeSetter = to(firestore.collection('comments').doc('commentId')).existingData()
    expect(mergeSetter).toBeInstanceOf(FirestoreMergeSetter)
  })

  it('is AppError called', () => {
    jest.spyOn(console, 'error')
    const _ = to(firestore.collection('comments')).existingData()
    expect(console.error).toHaveBeenCalled()
    jest.clearAllMocks()
  })
})
