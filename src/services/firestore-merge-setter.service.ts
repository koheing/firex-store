import { AppErrorOr } from '../types'
import { MergeSetter, Transaction } from '../models'
import { FirestoreRepository } from '../repositories'
import { SetCriteriaOptions } from '../options'

/**
 * @description class merge set data to firestore
 *
 * @example
 *   FirestoreMergeSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .mergeSet(data, {
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export class FirestoreMergeSetter implements MergeSetter, Transaction {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false

  /**
   * @description Make FirestoreMergeSetter instance
   * @param ref: firebase.firestore.DocumentReference
   * @returns FirestoreMergeSetter
   */
  static to(ref: firebase.firestore.DocumentReference): FirestoreMergeSetter {
    return new FirestoreMergeSetter(ref)
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
   * @description Call it if you wanna transaction
   * @return `this` FirestoreMergeSetter class instance
   */
  transaction(): FirestoreMergeSetter {
    this._isTransaction = true
    return this
  }

  /**
   * @description Firestore.collection('hoge').doc('fuga').set, merge is true. call `transaction` before call it, if you wanna transaction
   * @param data : Set data to firestore
   * @param options : {
   *         mapper,
   *         errorHandler,
   *         completionHandler
   *        } | undefined
   * @returns `AppError` or `undefined`
   */
  async mergeSet<T = any>(
    data: any,
    options?: SetCriteriaOptions<T>
  ): Promise<AppErrorOr<void>> {
    const _data = { ...data }
    const result = await FirestoreRepository.set({
      data: _data,
      ref: this._ref,
      isTransaction: this.isTransaction,
      ...options,
      merge: true
    })

    return result
  }
}
