import { FirestoreMapper } from "../../../src/models"
import { appErrorTree } from "../../../src/errors"

describe('FirestoreMapper', () => {
    class MockModel extends FirestoreMapper {}
  it('not implemented error', () => {
    try {
      MockModel.fromJson({})
    }
    catch (e) {
      expect(e).toEqual(appErrorTree.NOT_IMPLEMENTED)
    }
  })
})