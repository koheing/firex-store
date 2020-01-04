import { firestore } from './firebase'

export class MockDocumentSnapshot {
  id = 'test0001'
  ref = firestore.collection('/test').doc('testpath')
  metadata = {
    hasPendingWrites: false,
    fromCache: false,
    isEqual: jest.fn()
  }

  _data: any
  exists: boolean
  constructor(
    exists = true,
    data: { id: string; name: string; count: number } | null = {
      id: '',
      name: 'test',
      count: 0
    }
  ) {
    this._data = data
    this.exists = exists
  }

  data() {
    if (this._data) {
      this._data.id = this.id
    }
    return this._data
  }

  get = jest.fn()

  isEqual = jest.fn()
}
