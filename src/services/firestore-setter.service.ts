import { AppErrorOr, Mapper } from '../types'
import { Setter, Transaction, FirestoreMapper } from '../models'
import { FirestoreRepository } from '../repositories'
import { SetOptionsParameter } from '../parameters'

/**
 * Class set data to firestore
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
 *
 *   FirestoreSetter
 *     .to(firebase.firestore().collection('collection').doc('docId'))
 *     .transaction()  // <- call it if you wanna transaction
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .set(data, {
 *         errorHandler,
 *         completionHandler
 *     })
 */
export class FirestoreSetter implements Setter, Transaction {
  private _ref: firebase.firestore.DocumentReference
  private _isTransaction = false
  private _mapper?: Mapper<any>

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
  transaction(): this {
    this._isTransaction = true
    return this
  }

  /**
   * Convert data before registering data in Firestore with the results of calling a provided function(toJson)
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
      merge: false
    })

    return result
  }
}
