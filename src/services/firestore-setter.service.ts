import { AppErrorOr, DocumentId } from '../types'
import { Adder, Setter } from '../models'
import { FirestoreRepository } from '../repositories'
import { AddCriteriaOptions, SetCriteriaOptions } from '../options'

export class FirestoreSetter implements Setter {
  private _ref: firebase.firestore.DocumentReference

  static to(ref: firebase.firestore.DocumentReference): FirestoreSetter {
    return new FirestoreSetter(ref)
  }

  constructor(ref: firebase.firestore.DocumentReference) {
    this._ref = ref
  }

  get ref(): firebase.firestore.DocumentReference {
    return this._ref
  }

  async set<T = any>(
    data: any,
    options?: SetCriteriaOptions<T>
  ): Promise<AppErrorOr<void>> {
    const result = await FirestoreRepository.set({
      data,
      ref: this._ref,
      ...options
    })

    return result
  }
}
