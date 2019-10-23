import { from } from '../../../../src/v1-alpha/factories'
import {
  FirestoreFinder,
  FirestoreSubscriber
} from '../../../../src/v1-alpha/services'
import { firestore } from '../../../mocks/firebase'

describe('FirestoreReaderServiceFactory', () => {
  it('is FirestoreFinder instance', () => {
    const finder = from(firestore.collection('comments')).once()
    expect(finder).toBeInstanceOf(FirestoreFinder)
  })

  it('is FirestoreSubscriber instance', () => {
    const subscriber = from(firestore.collection('comments')).bindTo('comment')
    expect(subscriber).toBeInstanceOf(FirestoreSubscriber)
    expect(subscriber.statePropName).toEqual('comment')
  })
})
