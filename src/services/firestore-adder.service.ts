import { AppErrorOr, DocumentId, Mapper } from '../types'
import { Adder, FirestoreMapper } from '../models'
import { FirestoreRepository } from '../repositories'
import { AddOptionsParameter } from '../parameters'

/**
 *  Class add data to firestore
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
 *   FirestoreAdder
 *     .to(firebase.firestore().collection('collection'))
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .add(data, {
 *         errorHandler,
 *         completionHandler
 *     })
 */
export class FirestoreAdder implements Adder {
  private _ref: firebase.firestore.CollectionReference
  private _mapper?: Mapper<any>

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
   * Firestore.collection('hoge').add
   * @param data : add data to firestore
   * @param options : {
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
    const _options: AddOptionsParameter<any> = {
      ...options,
      ...{ mapper: this._mapper }
    }
    const result = await FirestoreRepository.add({
      ref: this._ref,
      data: _data,
      ..._options
    })
    return result
  }
}
