import { mapToIfDefined } from '../../../../src/service/helpers'
import { MockDocumentSnapshot } from '../../../mocks/mock-document-snapshot'
import * as jest from 'jest'

describe('mapToIfDefined', () => {
  it('mapper not defined', () => {
    const snapshot: firebase.firestore.DocumentSnapshot = new MockDocumentSnapshot()

    const result = mapToIfDefined(snapshot)

    expect(result.name).toBe('test')
    expect(result.count).toBe(0)
  })

  it('mapper defined', () => {
    const snapshot: firebase.firestore.DocumentSnapshot = new MockDocumentSnapshot()

    const mapper = (data: any) => ({
      name: data.name,
      count: data.count + 1
    })
    const result = mapToIfDefined(snapshot, mapper)

    expect(result.docId).toBe('test0001')
    expect(result.name).toBe('test')
    expect(result.count).toBe(1)
  })
})
