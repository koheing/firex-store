import { AppErrorOr } from '../types'
import { Setter, Transaction } from '../models'
import { FirestoreRepository } from '../repositories'
import { SetCriteriaOptions } from '../options'

export class FirestoreSetter implements Setter, Transaction {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false

  static to(ref: firebase.firestore.DocumentReference): FirestoreSetter {
    return new FirestoreSetter(ref)
  }

  constructor(ref: firebase.firestore.DocumentReference) {
    this._ref = ref
  }

  get ref(): firebase.firestore.DocumentReference {
    return this._ref
  }

  get isTransaction(): boolean {
    return this._isTransaction
  }

  transaction(): FirestoreSetter {
    this._isTransaction = true
    return this
  }

  async set<T = any>(
    data: any,
    options?: SetCriteriaOptions<T>
  ): Promise<AppErrorOr<void>> {
    const _data = { ...data }
    const result = await FirestoreRepository.set({
      data: _data,
      ref: this._ref,
      isTransaction: this.isTransaction,
      ...options,
      merge: false
    })

    return result
  }
}
