import { FirestoreAdder } from '../../../src/services'
import { FirestoreRepository } from '../../../src/repositories/index'
import { firestore } from '../../mocks/firebase'
import * as firebase from 'firebase'
import * as flushPromises from 'flush-promises'
import { MockCollectionReference } from '../../mocks/mock-collection-reference'

describe('FirestoreAdder', () => {
  it('return FirestoreAdder instance', () => {
    const adder = FirestoreAdder.to(firestore.collection('comments'))
    expect(adder).toBeInstanceOf(FirestoreAdder)
  })

  it('ref is CollectionReference instance', () => {
    const adder = FirestoreAdder.to(firestore.collection('comments'))
    expect(adder.ref).toBeInstanceOf(firebase.firestore.CollectionReference)
  })

  it('FirestoreRepository.add called', async (done) => {
    jest.spyOn(FirestoreRepository, 'add')
    const data = {} as any
    const adder = FirestoreAdder.to(
      new MockCollectionReference(
        data
      ) as firebase.firestore.CollectionReference
    )
    const result = adder.add({ name: 'test' })
    await flushPromises()
    expect(FirestoreRepository.add).toHaveBeenCalled()
    expect(result).toBeInstanceOf(Promise)
    jest.clearAllMocks()

    done()
  })
})
