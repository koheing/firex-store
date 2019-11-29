import { FirestoreMapper } from "../../../src/models"
import { appErrorTree } from "../../../src/errors"

describe('FirestoreMapper', () => {
    class MockModel extends FirestoreMapper {}
  it('fromJson: not implemented error', () => {
    try {
      MockModel.fromJson({})
    }
    catch (e) {
      expect(e).toEqual(appErrorTree.NOT_IMPLEMENTED)
    }
  })

  it('toJson: not implemented error', () => {
    try {
      MockModel.toJson({})
    }
    catch (e) {
      expect(e).toEqual(appErrorTree.NOT_IMPLEMENTED)
    }
  })
})