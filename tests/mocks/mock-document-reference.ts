import { firestore } from './firebase'

export class MockDocumentReference {
  promiseResult: Promise<firebase.firestore.DocumentSnapshot>
  constructor(promiseResult: Promise<firebase.firestore.DocumentSnapshot>) {
    this.promiseResult = promiseResult
  }
  id = 'testDoc1'
  firestore = firestore
  parent = firestore.collection('/test')
  path = '/test/testDoc1'
  collection = jest.fn()
  isEqual = jest.fn()
  set = jest.fn()
  update = jest.fn()
  delete = jest.fn()
  onSnapshot = jest.fn()
  get(options?: any) {
    return this.promiseResult
  }
}
