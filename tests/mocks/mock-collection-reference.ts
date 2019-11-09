import { MockQueryReference } from './mock-query-reference'
import { MockDocumentReference } from './mock-document-reference'
import { MockDocumentSnapshot } from './mock-document-snapshot'

export class MockCollectionReference extends MockQueryReference {
  readonly id: string
  readonly parent: any
  readonly path: string
  private _error: Error | null
  constructor(data: any, error: any = null) {
    super(data)
    this.id = 'testId'
    this.parent = null
    this.path = 'comments/path'
    this._error = error
  }
  doc(path: string) {
    return new MockDocumentReference(
        Promise.resolve(new MockDocumentSnapshot())
      ) as firebase.firestore.DocumentReference
  }
  add(data: any) {
    return this._error === null ? Promise.resolve(new MockDocumentReference(
        Promise.resolve(new MockDocumentSnapshot())
      )) : Promise.reject(this._error)
  }
}
