import { firestore } from './firebase'

interface Options {
  setReturnData?: Promise<any>
  runTransactionReturnData?: Promise<any>,
  deleteReturnData?: Promise<any>
}

export class MockDocumentReference {
  private _promiseResult: Promise<firebase.firestore.DocumentSnapshot>
  private _setReturnData?: Promise<any>
  private _deleteReturnData?: Promise<any>
  firestore: firebase.firestore.Firestore
  constructor(
    promiseResult: Promise<firebase.firestore.DocumentSnapshot>,
    options: Options = {
      setReturnData: Promise.resolve(),
      runTransactionReturnData: Promise.resolve(),
      deleteReturnData: Promise.resolve()
    }
  ) {
    this._promiseResult = promiseResult
    this._setReturnData = options.setReturnData
    this._deleteReturnData = options.deleteReturnData
      ? options.deleteReturnData
      : Promise.resolve()
    this.firestore = {
      runTransaction<T>(
        updateFunction: (
          transaction: firebase.firestore.Transaction
        ) => Promise<T>
      ) {
        return options.runTransactionReturnData
          ? options.runTransactionReturnData
          : Promise.resolve()
      }
    } as firebase.firestore.Firestore
  }
  id = 'testDoc1'
  parent = firestore.collection('/test')
  path = '/test/testDoc1'
  collection = jest.fn()
  isEqual = jest.fn()
  set(data: any) {
    return this._setReturnData
  }
  update = jest.fn()
  delete() {
    return this._deleteReturnData
  }
  onSnapshot = jest.fn()
  get(options?: any) {
    return this._promiseResult
  }
}
