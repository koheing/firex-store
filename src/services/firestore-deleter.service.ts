import { Deleter, Transaction } from '../models'
import { AppErrorOr } from '../types'
import { FirestoreRepository } from '../repositories'
import { DeleteOptionsParameter } from '../parameters'

/**
 * Class delete firestore data
 *
 * @example
 *   FirestoreDeleter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .delete({ errorHandler, completionHandler })
 */
export class FirestoreDeleter implements Deleter, Transaction {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false

  /**
   * Make FirestoreDeleter instance
   * @param ref: firebase.firestore.DocumentReference
   * @returns FirestoreDeleter
   */
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

  /**
   * Call this if you wanna use transaction
   * @return  `FirestoreSetter class instance`
   */
  transaction(): this {
    this._isTransaction = true
    return this
  }

  /**
   * Firestore.collection('hoge').doc('fuga').delete. call `transaction` before call it, if you wanna transaction
   * @param options : {
   *         errorHandler,
   *         completionHandler
   *        } | undefined
   * @returns `AppError` or `undefined`
   */
  async delete(options?: DeleteOptionsParameter): Promise<AppErrorOr<void>> {
    const result: AppErrorOr<void> = await FirestoreRepository.delete({
      ref: this._ref,
      isTransaction: this._isTransaction,
      ...options,
    })

    return result
  }
}
