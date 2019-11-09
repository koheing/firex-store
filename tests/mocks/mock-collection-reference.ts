import { MockQueryReference } from './mock-query-reference'
import { MockDocumentReference } from './mock-document-reference'
import { MockDocumentSnapshot } from './mock-document-snapshot'

export class MockCollectionReference extends MockQueryReference {
  readonly id: string
  readonly parent: any
  readonly path: string
  constructor(data: any) {
    super(data)
    this.id = 'testId'
    this.parent = null
    this.path = 'comments/path'
  }
  doc(path: string) {
    return new MockDocumentReference(
        Promise.resolve(new MockDocumentSnapshot())
      ) as firebase.firestore.DocumentReference
  }
  add(data: any) {
    return Promise.resolve(new MockDocumentReference(
        Promise.resolve(new MockDocumentSnapshot())
      ))
  }
}
