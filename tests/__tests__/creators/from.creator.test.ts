import { from } from '../../../src/creators'
import { FirestoreReaderServiceFactory } from '../../../src/creators/helpers'
import { firestore } from '../../mocks/firebase'

describe('from', () => {
  it('is FirestoreReaderServiceFactory instance', () => {
    const readerFactory = from(firestore.collection('comments'))
    expect(readerFactory).toBeInstanceOf(FirestoreReaderServiceFactory)
  })
})
