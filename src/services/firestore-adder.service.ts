import { AppErrorOr, DocumentId } from '../types'
import { Adder } from '../models'
import { FirestoreRepository } from '../repositories'
import { AddOptionsParameter } from '../parameters'

/**
 * @description class add data to firestore
 *
 * @example
 *   FirestoreAdder
 *     .to(firebase.firestore().collection('collection'))
 *     .add(data, {
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export class FirestoreAdder implements Adder {
  private _ref: firebase.firestore.CollectionReference

  static to(ref: firebase.firestore.CollectionReference): FirestoreAdder {
    return new FirestoreAdder(ref)
  }

  constructor(ref: firebase.firestore.CollectionReference) {
    this._ref = ref
  }

  get ref(): firebase.firestore.CollectionReference {
    return this._ref
  }

  /**
   * @description Firestore.collection('hoge').add
   * @param data : add data to firestore
   * @param options : {
   *         mapper,
   *         errorHandler,
   *         completionHandler
   *        } | undefined
   * @returns `DocumentId(string)` or `AppError`
   */
  async add<T = any>(
    data: any,
    options?: AddOptionsParameter<T>
  ): Promise<AppErrorOr<DocumentId>> {
    const _data = { ...data }
    const result = await FirestoreRepository.add({
      ref: this._ref,
      data: _data,
      ...options
    })
    return result
  }
}
