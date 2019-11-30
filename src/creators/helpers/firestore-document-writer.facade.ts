import { AppErrorOr, Mapper } from '../../types'
import { SetOptionsParameter, DeleteOptionsParameter } from '../../parameters'
import {
  FirestoreSetter,
  FirestoreMergeSetter,
  FirestoreDeleter
} from '../../services'
import { Transaction, MergeSetter, Setter, FirestoreMapper } from '../../models'

/**
 * facade of FirestoreSetter and FirestoreMergeSetter
 * @param ref: firebase.firestore.DocumentReference
 * @method transaction: Call it if you wanna transaction
 * @method set: Firestore.set, merge is false
 * @method mergeSet: Firestore.set, merge is true
 */
export class FirestoreDocumentWriterFacade
  implements Transaction, MergeSetter, Setter {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false
  private _mapper?: Mapper<any>

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
   * Call it if you wanna transaction
   * @return `FirestoreDocumentWriterFacade class instance`
   */
  transaction(): this {
    this._isTransaction = true
    return this
  }

  /**
   * Convert data before registering data in Firestoren with the results of calling a provided function(toJson)
   * @param className extends FirestoreMapper
   * @returns FirestoreAdder
   */
  mapOf<T extends FirestoreMapper>(className: T): this {
    // @ts-ignore
    this._mapper = className.toJson
    return this
  }

  /**
   * Firestore.collection('hoge').doc('fuga').set, merge is false. call `transaction` before call it, if you wanna transaction
   * @param data : Set data to firestore
   * @param options : {
   *         errorHandler,
   *         completionHandler
   *        } | undefined
   * @returns `AppError` or `undefined`
   */
  async set<T = any>(
    data: any,
    options?: SetOptionsParameter<T>
  ): Promise<AppErrorOr<void>> {
    const _options: SetOptionsParameter<any> = {
      ...options,
      ...{ mapper: this._mapper }
    }
    return this._isTransaction
      ? FirestoreSetter.to(this._ref)
          .transaction()
          .set(data, _options)
      : FirestoreSetter.to(this._ref).set(data, _options)
  }

  /**
   * Firestore.collection('hoge').doc('fuga').set, merge is true. call `transaction` before call it, if you wanna transaction
   * @param data : Set data to firestore
   * @param options : {
   *         errorHandler,
   *         completionHandler
   *        } | undefined
   * @returns `AppError` or `undefined`
   */
  async mergeSet<T = any>(
    data: any,
    options?: SetOptionsParameter<T>
  ): Promise<AppErrorOr<void>> {
    const _options: SetOptionsParameter<any> = {
      ...options,
      ...{ mapper: this._mapper }
    }
    return this._isTransaction
      ? FirestoreMergeSetter.to(this._ref)
          .transaction()
          .mergeSet(data, _options)
      : FirestoreMergeSetter.to(this._ref).mergeSet(data, _options)
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
    return this._isTransaction
      ? FirestoreDeleter.to(this._ref)
          .transaction()
          .delete(options)
      : FirestoreDeleter.to(this._ref).delete()
  }
}
