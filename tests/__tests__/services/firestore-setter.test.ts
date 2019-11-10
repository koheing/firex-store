import { FirestoreSetter } from '../../../src/services'
import { FirestoreRepository } from '../../../src/repositories/index'
import { firestore } from '../../mocks/firebase'
import * as firebase from 'firebase'
import * as flushPromises from 'flush-promises'
import { MockCollectionReference } from '../../mocks/mock-collection-reference'

describe('FirestoreSetter', () => {
  it('return FirestoreSetter instance', () => {
    const adder = FirestoreSetter.to(
      firestore.collection('comments').doc('commentId')
    )
    expect(adder).toBeInstanceOf(FirestoreSetter)
  })

  it('ref is DocumentReference instance', () => {
    const adder = FirestoreSetter.to(
      firestore.collection('comments').doc('commentId')
    )
    expect(adder.ref).toBeInstanceOf(firebase.firestore.DocumentReference)
  })

  it('transaction is true', () => {
    const setter = FirestoreSetter.to(
      firestore.collection('comments').doc('commentId')
    )
    expect(setter.isTransaction).toBeFalsy()
    expect(setter.transaction().isTransaction).toBeTruthy()
  })

  it('FirestoreRepository.set called with no transaction', async (done) => {
    const mockSetter = jest.spyOn(FirestoreRepository, 'set')
    const data = {} as any
    const setter = FirestoreSetter.to(
      new MockCollectionReference(data).doc('documentId')
    )
    const result = setter.set({ name: 'test' })
    await flushPromises()
    expect(FirestoreRepository.set).toHaveBeenCalled()
    expect(mockSetter.mock.calls[0][0].isTransaction).toBeFalsy()
    expect(mockSetter.mock.calls[0][0].merge).toBeFalsy()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()

    done()
  })
})
