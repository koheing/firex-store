import { FirestoreSubscriber } from '../../../src/services'
import { FirestoreRepository } from '../../../src/repositories/index'
import { firestore } from '../../mocks/firebase'
jest.mock('../../../src/repositories/index')

describe('FirestoreFetcher', () => {
  it('subscribe method called', () => {
    FirestoreSubscriber.from(firestore.collection('comments').doc('commentId'))
      .bindTo('comment')
      .subscribe({}, jest.fn())
    expect(FirestoreRepository.subscribe).toHaveBeenCalled()
  })

  it('subscribeAll method called', () => {
    FirestoreSubscriber.from(firestore.collection('comments'))
      .bindTo('comments')
      .subscribe({}, jest.fn())

    expect(FirestoreRepository.subscribeAll).toHaveBeenCalled()
  })

  it('not bindTo method call yet error', () => {
    jest.spyOn(console, 'error')
    FirestoreSubscriber.from(
      firestore.collection('comments').doc('commentId')
    ).subscribe({}, jest.fn())

    expect(console.error).toHaveBeenCalled()
  })
})
