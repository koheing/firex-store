import { AppErrorOr, FirestoreRef, DocumentId } from '../types'
import { Creator } from '../models/creator.model'
import { isDocumentRef } from './helpers'
import { AppError } from '../models'

export class FirestoreCreator implements Creator {
  private _ref: FirestoreRef
  private _isBatch: boolean = false

  static to(ref: FirestoreRef, isBatch: boolean = false) {
    return new FirestoreCreator(ref, isBatch)
  }

  constructor(ref: FirestoreRef, isBatch: boolean = false) {
    this._ref = ref
    this._isBatch = isBatch
  }

  get ref(): FirestoreRef {
    return this._ref
  }

  async add<T>(data: T): Promise<AppErrorOr<DocumentId>> {
    if (isDocumentRef(this._ref)) {
      return Promise.resolve({ message: 'Wrong' } as AppError)
    }
    const ref = this._ref as firebase.firestore.CollectionReference

    const result: AppErrorOr<DocumentId> = await ref
      .add(data)
      .then((it) => it.id)
      .catch((error: AppError) => {
        console.error(error)
        return error
      })
    return result
  }

  async set<T>(data: T, { merge }: { merge: boolean } = { merge: false }) {
    if (!isDocumentRef(this._ref)) {
      return Promise.resolve({ message: 'Wrong' } as AppError)
    }
    const result: AppErrorOr<void> = await this._ref
      .set(data, { merge })
      .catch((error: AppError) => {
        console.error(error)
        return error
      })

    return result
  }
}
