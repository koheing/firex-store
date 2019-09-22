import { firestore } from './firebase'

export class MockDocumentSnapshot {
  id = 'test0001'
  ref = firestore.collection('/test').doc('testpath')
  exists = true
  metadata = {
    hasPendingWrites: false,
    fromCache: false,
    isEqual: jest.fn()
  }

  _data: any
  constructor(
    data: { name: string; count: number } = {
      name: 'test',
      count: 0
    }
  ) {
    this._data = data
  }

  data() {
    return this._data
  }

  get = jest.fn()

  isEqual = jest.fn()
}
