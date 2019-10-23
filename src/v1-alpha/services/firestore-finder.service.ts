import { Find } from '../models'
import { FirestoreRef } from '../types'
import { FindCriteriaOptions } from '../options'
import { isDocumentRef } from './helpers'
import { FirestoreRepository } from '../repositories'

/**
 * @description class find firestore data at once
 *
 * @example
 *   FirestoreFinder
 *     .from(firebase.firestore().collection('collection'))
 *     .find({
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export class FirestoreFinder implements Find {
  private _ref: FirestoreRef

  /**
   * @description Make FirestoreFetcher instance
   * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
   * @returns FirestoreFetcher
   */
  static from(ref: FirestoreRef): FirestoreFinder {
    return new FirestoreFinder(ref)
  }

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

  get ref(): FirestoreRef {
    return this._ref
  }

  /**
   * @description find firestore data at once
   * @param options: { mapper,
   *         errorHandler,
   *         completionHandler } | undefined
   */
  find<T = any>(options?: FindCriteriaOptions<T>): Promise<any> {
    return isDocumentRef(this.ref)
      ? FirestoreRepository.find({ ref: this.ref, ...options })
      : FirestoreRepository.findAll({ ref: this.ref, ...options })
  }
}
