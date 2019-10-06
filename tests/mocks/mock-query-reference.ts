import { firestore } from './firebase'

export class MockQueryReference {
  promiseResult: Promise<firebase.firestore.QuerySnapshot>
  constructor(promiseResult: Promise<firebase.firestore.QuerySnapshot>) {
    this.promiseResult = promiseResult
  }
  firestore = firestore
  where = jest.fn()
  orderBy = jest.fn()
  limit = jest.fn()
  startAt = jest.fn()
  startAfter = jest.fn()
  endBefore = jest.fn()
  endAt = jest.fn()
  isEqual = jest.fn()
  get(options?: any) {
    return this.promiseResult
  }
  onSnapshot = jest.fn()
}
