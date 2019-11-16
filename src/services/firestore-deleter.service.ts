import { Deleter, Transaction } from '../models'
import { AppErrorOr } from '../types'
import { FirestoreRepository } from '../repositories'
import { DeleteOptionsParameter } from '../parameters'

export class FirestoreDeleter implements Deleter, Transaction {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false

  static to(ref: firebase.firestore.DocumentReference): FirestoreDeleter {
    return new FirestoreDeleter(ref)
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

  transaction(): FirestoreDeleter {
    this._isTransaction = true
    return this
  }

  async delete(options?: DeleteOptionsParameter): Promise<AppErrorOr<void>> {
    const result: AppErrorOr<void> = await FirestoreRepository.delete({
      ref: this._ref,
      isTransaction: this._isTransaction,
      ...options
    })

    return result
  }
}
