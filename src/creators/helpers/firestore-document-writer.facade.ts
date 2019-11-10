import { AppErrorOr } from '../../types'
import { SetCriteriaOptions } from '../../options'
import { FirestoreSetter, FirestoreMergeSetter } from '../../services'

export class FirestoreDocumentWriterFacade {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false

  constructor(ref: firebase.firestore.DocumentReference) {
    this._ref = ref
  }

  transaction(): FirestoreDocumentWriterFacade {
    this._isTransaction = true
    return this
  }

  async set<T = any>(
    data: any,
    options?: SetCriteriaOptions<T>
  ): Promise<AppErrorOr<void>> {
    return this._isTransaction
      ? FirestoreSetter.to(this._ref)
          .transaction()
          .set(data, options)
      : FirestoreSetter.to(this._ref).set(data, options)
  }

  async mergeSet<T = any>(
    data: any,
    options?: SetCriteriaOptions<T>
  ): Promise<AppErrorOr<void>> {
    return this._isTransaction
      ? FirestoreMergeSetter.to(this._ref)
          .transaction()
          .mergeSet(data, options)
      : FirestoreMergeSetter.to(this._ref).mergeSet(data, options)
  }
}
