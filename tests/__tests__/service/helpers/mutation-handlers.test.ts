import { 
  callDocumentMutation, callCollectionMutation
} from '../../../../src/service/helpers/mutation-handlers'
import{ MockDocumentSnapshot } from '../../../mocks/mock-document-snapshot'
import{ MockQuerySnapshot } from '../../../mocks/mock-query-snapshot'
import { Payload } from '../../../../src/models'

describe('callDocumentMutation', () => {
  it('documentMutation called, type and isLast are default value', () => {
    const callMutation = jest.fn((type: string, payload: Payload) => payload)
    const afterMutationCalled = jest.fn()
    callDocumentMutation({
      snapshot: new MockDocumentSnapshot(),
      callMutation,
      afterMutationCalled
    })
  
    expect(callMutation).toHaveBeenCalled()
    expect(callMutation.mock.calls[0][0]).toBe('added')
    expect(callMutation.mock.calls[0][1].data.docId).toEqual('test0001')
    expect(callMutation.mock.calls[0][1].data.count).toEqual(0)
    expect(callMutation.mock.calls[0][1].isLast).toBeTruthy()
    expect(afterMutationCalled).toHaveBeenCalled()
  })

  it('documentMutation called, type and isLast are custom value', () => {
    const callMutation = jest.fn((type: string, payload: Payload) => payload)
    const afterMutationCalled = jest.fn()
    callDocumentMutation({
      snapshot: new MockDocumentSnapshot(),
      callMutation,
      afterMutationCalled,
      type: 'modified',
      isLast: false
    })
  
    expect(callMutation).toHaveBeenCalled()
    expect(callMutation.mock.calls[0][0]).toBe('modified')
    expect(callMutation.mock.calls[0][1].data.docId).toEqual('test0001')
    expect(callMutation.mock.calls[0][1].data.count).toEqual(0)
    expect(callMutation.mock.calls[0][1].isLast).toBeFalsy()
    expect(afterMutationCalled).toHaveBeenCalled()
  })
})

describe('callCollectionMutation', () => {
  it('documentMutation called, type and isLast are default value', () => {
    const callMutation = jest.fn((type: string, payload: Payload) => payload)
    const afterMutationCalled = jest.fn()
    const notifyNotFound = jest.fn()
    callCollectionMutation({
      snapshot: new MockQuerySnapshot(true,
        [
          new MockDocumentSnapshot(),
          new MockDocumentSnapshot(true, { name: 'test0002', count: 1 })
        ]),
      callMutation,
      afterMutationCalled,
      notifyNotFound
    })

    expect(callMutation).toHaveBeenCalled()
    expect(afterMutationCalled).toHaveBeenCalled()
  })
})