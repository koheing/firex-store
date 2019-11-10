import { to } from '../../../src/creators'
import { FirestoreAdder } from '../../../src/services'
import { FirestoreDocumentWriterFacade } from '../../../src/creators/helpers'
import { firestore } from '../../mocks/firebase'

describe('to', () => {
  it('is FirestoreAdder instance', () => {
    const adder = to(firestore.collection('comments'))
    expect(adder).toBeInstanceOf(FirestoreAdder)
  })

  it('is FirestoreDocumentWriterFacade instance', () => {
    const writerFacade = to(firestore.collection('comments').doc('commentId'))
    expect(writerFacade).toBeInstanceOf(FirestoreDocumentWriterFacade)
  })
})
