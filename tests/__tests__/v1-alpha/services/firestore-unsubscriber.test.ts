import { FirestoreUnsubscriber } from '../../../../src/v1-alpha/services'
import {
  FIREX_DOCUMENT_UNSUBSCRIBER,
  FIREX_COLLECTION_UNSUBSCRIBER
} from '../../../../src/v1-alpha/configurations'

describe('FirestoreFetcher', () => {
  it('unsubscribe document called', () => {
    const mockUnsubscriber = jest.fn()
    FirestoreUnsubscriber.unbind('document').unsubscribe({
      [FIREX_DOCUMENT_UNSUBSCRIBER]: mockUnsubscriber
    })

    expect(mockUnsubscriber).toHaveBeenCalled()
  })

  it('unsubscribe collection called', () => {
    const mockUnsubscriber = jest.fn()
    FirestoreUnsubscriber.unbind('collection').unsubscribe({
      [FIREX_COLLECTION_UNSUBSCRIBER]: mockUnsubscriber
    })

    expect(mockUnsubscriber).toHaveBeenCalled()
  })

  it('unsubscribe document not called', () => {
    const mockUnsubscriber = jest.fn()
    FirestoreUnsubscriber.unbind('document').unsubscribe({})

    expect(mockUnsubscriber).not.toHaveBeenCalled()
  })
})
