import { AppErrorOr } from '../types'
import { Setter, Transaction } from '../models'
import { FirestoreRepository } from '../repositories'
import { SetOptionsParameter } from '../parameters'

/**
 * Class set data to firestore
 *
 * @example
 *   FirestoreSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .set(data, {
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export class FirestoreSetter implements Setter, Transaction {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false

  /**
   * Make FirestoreSetter instance
   * @param ref: firebase.firestore.DocumentReference
   * @returns FirestoreSetter
   */
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

  /**
   * Call this if you wanna use transaction
   * @return  `FirestoreSetter class instance`
   */
  transaction(): FirestoreSetter {
    this._isTransaction = true
    return this
  }

  /**
   * Firestore.collection('hoge').doc('fuga').set, merge is false. call `transaction` before call it, if you wanna transaction
   * @param data : Set data to firestore
   * @param options : {
   *         mapper,
   *         errorHandler,
   *         completionHandler
   *        } | undefined
   * @returns `AppError` or `undefined`
   */
  async set<T = any>(
    data: any,
    options?: SetOptionsParameter<T>
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
