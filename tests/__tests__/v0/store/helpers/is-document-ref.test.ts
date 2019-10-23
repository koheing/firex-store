import { isDocumentRef } from '../../../../../src/v0/store/helpers/is-document-ref'
import { firestore } from '../../../../mocks/firebase'

describe('isDocumentRef', () => {
  it('return true', () => {
    const ref = firestore.collection('/test').doc('testId')
    const result = isDocumentRef(ref)

    expect(result).toBeTruthy()
  })

  it('return false', () => {
    const ref = firestore.collection('/test')
    const result = isDocumentRef(ref)

    expect(result).toBeFalsy()
  })
})
