import { FirestoreSubscriber } from '../../../src/services'
import { FirestoreRepository } from '../../../src/repositories/index'
import { firestore } from '../../mocks/firebase'
import { FIREX_UNSUBSCRIBES } from '../../../src/configurations'
jest.mock('../../../src/repositories/index')

describe('FirestoreFinder', () => {
  
  beforeEach(() => {
    jest.clearAllMocks()
  })

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

  it('subscribeAll or subscribe method not called', () => {
    const mockMap = new Map<string, any>()
    mockMap.set('comments', jest.fn())
    const mockState: any = {}
    mockState[FIREX_UNSUBSCRIBES] = mockMap
    FirestoreSubscriber.from(firestore.collection('comments'))
      .bindTo('comments')
      .subscribe(mockState, jest.fn())

    expect(FirestoreRepository.subscribeAll).not.toHaveBeenCalled()
  })

  it('not bindTo method call yet error', () => {
    jest.spyOn(console, 'error')
    FirestoreSubscriber.from(
      firestore.collection('comments').doc('commentId')
    ).subscribe({}, jest.fn())

    expect(console.error).toHaveBeenCalled()
  })
})
