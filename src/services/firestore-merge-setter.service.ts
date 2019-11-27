import { AppErrorOr, Mapper } from '../types'
import { MergeSetter, Transaction, FirestoreMapper } from '../models'
import { FirestoreRepository } from '../repositories'
import { SetOptionsParameter } from '../parameters'

/**
 * Class merge set data to firestore
 *
 * @example
 *   class FirestoreMapperModel extends FirestoreMapper {
 *     id: number
 *     name: string
 *     static fromJson(data: { [key: string]: any }) {
 *        return { id: data.id, name: data.name } as FirestoreMapperModel
 *     }
 *     static toJson(data: FirestoreMapperModel) {
 *        return { id: data.id, name: data.name }
 *     }
 *   }
 *   FirestoreMergeSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .mapOf(FirestoreMapperModel)  // <- option
 *     .mergeSet(data, {
 *         errorHandler,
 *         completionHandler
 *     })
 */
export class FirestoreMergeSetter implements MergeSetter, Transaction {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false
  private _mapper?: Mapper<any>

  /**
   *  Make FirestoreMergeSetter instance
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
   * Call this if you wanna use transaction
   * @return `FirestoreMergeSetter class instance`
   */
  transaction(): this {
    this._isTransaction = true
    return this
  }

  /**
   * Convert data before registering data in Firestoren with the results of calling a provided function(toJson)
   * @param className extends FirestoreMapper
   * @returns FirestoreMergeSetter
   */
  mapOf<T extends FirestoreMapper>(className: T): this {
    // @ts-ignore
    this._mapper = className.toJson
    return this
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
    const _data = { ...data }
    const _options: SetOptionsParameter<any> = {
      ...options,
      ...{ mapper: this._mapper }
    }
    const result = await FirestoreRepository.set({
      data: _data,
      ref: this._ref,
      isTransaction: this.isTransaction,
      ..._options,
      merge: true
    })

    return result
  }
}
