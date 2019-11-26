import { Finder, FirestoreMapper } from '../models'
import { FirestoreRef, NullOr } from '../types'
import { FindOptionsParameter } from '../parameters'
import { isDocumentRef } from './helpers'
import { FirestoreRepository } from '../repositories'

/**
 * Class find firestore data at once
 * @returns null | error | any
 *   - error: if you defined errorHandler, it changed any
 *
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
export class FirestoreFinder implements Finder {
  private _ref: FirestoreRef

  /**
   * Make FirestoreFinder instance
   * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
   * @returns FirestoreFinder
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

  mapOf<T extends FirestoreMapper>(className: T): this {
    // @ts-ignore
    this._mapper = className.fromJson
    return this
  }

  /**
   * Find firestore data at once
   * @param options: {
   *         mapper,
   *         errorHandler,
   *         completionHandler } | undefined
   * @returns null | error | any
   *   - error: if you defined errorHandler, it changed any
   */
  find<T = any>(options?: FindOptionsParameter<T>): Promise<NullOr<T | any>> {
    return isDocumentRef(this.ref)
      ? FirestoreRepository.find({ ref: this.ref, ...options })
      : FirestoreRepository.findAll({ ref: this.ref, ...options })
  }
}
