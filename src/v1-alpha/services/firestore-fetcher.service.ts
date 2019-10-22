import { Fetch } from '../models'
import { FirestoreRef } from '../types'
import { FindCriteriaOptions } from '../options'
import { isDocumentRef } from './helpers'
import { FirestoreRepository } from '../repositories'

/**
 * @description class fetch firestore data at once
 *
 * @example
 *   FirestoreFetcher
 *     .where(firebase.firestore().collection('collection'))
 *     .fetch({
 *         mapper,
 *         errorHandler,
 *         completionHandler
 *     })
 */
export class FirestoreFetcher implements Fetch {
  private _ref: FirestoreRef

  /**
   * @description Make FirestoreFetcher instance
   * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
   * @returns FirestoreFetcher
   */
  static where(ref: FirestoreRef): FirestoreFetcher {
    return new FirestoreFetcher(ref)
  }

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

  get ref(): FirestoreRef {
    return this._ref
  }

  /**
   * @description fetch firestore data at once
   * @param options: { mapper,
   *         errorHandler,
   *         completionHandler } | undefined
   */
  fetch<T = any>(options?: FindCriteriaOptions<T>): Promise<any> {
    return isDocumentRef(this.ref)
      ? FirestoreRepository.find({ ref: this.ref, ...options })
      : FirestoreRepository.findAll({ ref: this.ref, ...options })
  }
}
