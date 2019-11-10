import { AppErrorOr } from '../../types'
import { SetCriteriaOptions } from '../../options'
import { FirestoreSetter, FirestoreMergeSetter } from '../../services'
import { Transaction, MergeSetter, Setter } from '../../models'

export class FirestoreDocumentWriterFacade
  implements Transaction, MergeSetter, Setter {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false

  constructor(ref: firebase.firestore.DocumentReference) {
    this._ref = ref
  }

  get ref(): firebase.firestore.DocumentReference {
    return this._ref
  }

  get isTransaction(): boolean {
    return this._isTransaction
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
