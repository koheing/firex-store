import { AppErrorOr } from '../../types'
import { SetCriteriaOptions } from '../../options'
import { FirestoreSetter, FirestoreMergeSetter } from '../../services'
import { Transaction, MergeSetter, Setter } from '../../models'

/**
 * @description facade of FirestoreSetter and FirestoreMergeSetter
 * @param ref: firebase.firestore.DocumentReference
 * @method transaction: Call it if you wanna transaction
 * @method set: Firestore.set, merge is false
 * @method mergeSet: Firestore.set, merge is true
 */
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

  /**
   * @description Call it if you wanna transaction
   * @return `FirestoreDocumentWriterFacade class instance`
   */
  transaction(): FirestoreDocumentWriterFacade {
    this._isTransaction = true
    return this
  }

  /**
   * @description Firestore.collection('hoge').doc('fuga').set, merge is false. call `transaction` before call it, if you wanna transaction
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
    options?: SetCriteriaOptions<T>
  ): Promise<AppErrorOr<void>> {
    return this._isTransaction
      ? FirestoreSetter.to(this._ref)
          .transaction()
          .set(data, options)
      : FirestoreSetter.to(this._ref).set(data, options)
  }

  /**
   * @description Firestore.collection('hoge').doc('fuga').set, merge is true. call `transaction` before call it, if you wanna transaction
   * @param data : Set data to firestore
   * @param options : { mapper,
   *         errorHandler,
   *         completionHandler
   *        } | undefined
   * @returns `AppError` or `undefined`
   */
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
