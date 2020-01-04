import { firestore } from './firebase'
import { MockDocumentSnapshot } from './mock-document-snapshot'

export class MockQuerySnapshot {
  query = firestore.collection('/test')
  metadata = {
    hasPendingWrites: false,
    fromCache: false,
    isEqual: jest.fn()
  }
  docs: firebase.firestore.QueryDocumentSnapshot[]
  size = 2
  empty = false

  docChanges(options?: any) {
    return [
      {
        type: 'added',
        doc: new MockDocumentSnapshot(),
        oldIndex: 0,
        newIndex: 0
      },
      {
        type: 'added',
        doc: new MockDocumentSnapshot(true, {
          id: '',
          name: 'test0002',
          count: 1
        }),
        oldIndex: 1,
        newIndex: 1
      }
    ] as firebase.firestore.DocumentChange[]
  }

  forEach = jest.fn()

  isEqual = jest.fn()

  constructor(
    empty = false,
    docs = [
      new MockDocumentSnapshot(),
      new MockDocumentSnapshot(true, { id: '', name: 'test0002', count: 1 })
    ]
  ) {
    this.empty = empty
    this.docs = docs
  }
}
