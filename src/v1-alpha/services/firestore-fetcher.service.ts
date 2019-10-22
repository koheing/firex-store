import { Fetch } from '../models'
import { FirestoreRef } from '../types'
import { FindCriteriaOptions } from '../options'
import { isDocumentRef } from './helpers'
import { FirestoreRepository } from '../repositories'

export class FirestoreFetcher implements Fetch {
  private _ref: FirestoreRef

  static where(ref: FirestoreRef): FirestoreFetcher {
    return new FirestoreFetcher(ref)
  }

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

  get ref(): FirestoreRef {
    return this._ref
  }

  fetch<T = any>(options?: FindCriteriaOptions<T>): Promise<any> {
    return isDocumentRef(this.ref)
      ? FirestoreRepository.find({ ref: this.ref, ...options })
      : FirestoreRepository.findAll({ ref: this.ref, ...options })
  }
}
