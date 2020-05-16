import { from } from '../../../../src/creators'
import {
  FirestoreFinder,
  FirestoreSubscriber,
  map,
  bindTo,
} from '../../../../src'
import { firestore } from '../../../mocks/firebase'
import { FirestoreStreamSubscriber } from '../../../../src/services'

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

  it('is FirestoreStreamSubscriber instance', () => {
    const subscriber = from(firestore.collection('comments')).pipe(
      map((it) => ({ id: it.docId })),
      bindTo('charactor')
    )
    expect(subscriber).toBeInstanceOf(FirestoreStreamSubscriber)
  })
})
