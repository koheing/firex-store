import { firestore } from './firebase'
import { MockDocumentSnapshot } from './mock-document-snapshot'

export class MockQuerySnapshot {
  query = firestore.collection('/test')
  metadata = {
    hasPendingWrites: false,
    fromCache: false,
    isEqual: jest.fn()
  }
  docs: firebase.firestore.QueryDocumentSnapshot[] = [
    new MockDocumentSnapshot(),
    new MockDocumentSnapshot({ name: 'test0002', count: 1 })
  ]
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
        doc: new MockDocumentSnapshot({ name: 'test0002', count: 1 }),
        oldIndex: 1,
        newIndex: 1
      }
    ] as firebase.firestore.DocumentChange[]
  }

  forEach = jest.fn()

  isEqual = jest.fn()
}
