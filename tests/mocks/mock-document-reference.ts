import { firestore } from './firebase'

interface Options {
  setReturnData: Promise<any>
  // updateFunction: <T = any>(transaction: firebase.firestore.Transaction) => Promise<T>
}

export class MockDocumentReference {
  promiseResult: Promise<firebase.firestore.DocumentSnapshot>
  setReturnData: Promise<any>
  constructor(
    promiseResult: Promise<firebase.firestore.DocumentSnapshot>,
    options: Options = {
      setReturnData: Promise.resolve()
    }
  ) {
    this.promiseResult = promiseResult
    this.setReturnData = options.setReturnData
  }
  id = 'testDoc1'
  firestore = firestore
  parent = firestore.collection('/test')
  path = '/test/testDoc1'
  collection = jest.fn()
  isEqual = jest.fn()
  set(data: any) {
    return this.setReturnData
  }
  update = jest.fn()
  delete = jest.fn()
  onSnapshot = jest.fn()
  get(options?: any) {
    return this.promiseResult
  }
}
