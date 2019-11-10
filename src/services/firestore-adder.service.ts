import { AppErrorOr, DocumentId } from '../types'
import { Adder } from '../models'
import { FirestoreRepository } from '../repositories'
import { AddCriteriaOptions } from '../options'

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

  async add<T = any>(
    data: any,
    options?: AddCriteriaOptions<T>
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
