import { appErrorTree } from '../errors'

/**
 * Delegator class that convert data subscribed from Firestore or set to Firestore.
 * This is called when you use `mapOf` function in `from`, `FirestoreSubscriber`, `FirestoreFinder`
 * @example
 * class Model extends FirestoreMapper {
 *   static fromJson(data: { [key: string]: any }) {
 *     return new Model()
 *   }
 * 
 *   static toJson(data: Model) {
 *     return { id: data.id }
 *   }
 * }
 */
export abstract class FirestoreMapper {
  /**
   * Mapper that converts data subscribed from Firestore
   * @param data  { [key: string]: any }
   * @returns any
   * @example
   * class Model extends FirestoreMapper {
   *   id: string
   *   firstName: string
   *   familyName: string
   *
   *   static fromJson(data: { [key: string]: any }): Model {
   *     return {
   *       id: data.id,
   *       firstName: data.first_name,
   *       familyName: data.family_name
   *     } as Model
   *   }
   *
   *   constructor(data: Partial<Model> = {}) {
   *     this.id = data.id || ''
   *     this.firstName = data.firstName || ''
   *     this.familyName = data.familyName || ''
   *   }
   * }
   */
  static fromJson(data: { [key: string]: any }): any {
    throw appErrorTree.NOT_IMPLEMENTED
  }

  /**
   * Mapper used before registering data in Firestore.
   * This is called when you use `mapOf` function in `to`, `FirestoreAdder`, `FirestoreSetter`, `FirestoreMergeSetter`
   * @param data  { [key: string]: any }
   * @returns any
   * @example
   * class Model extends FirestoreMapper {
   *   id: string
   *   firstName: string
   *   familyName: string
   *
   *   static toJson(data: Model): Model {
   *     return {
   *       id: data.id,
   *       first_name: data.firstName,
   *       family_name: data.familyName
   *     } as Model
   *   }
   *
   *   constructor(data: Partial<Model> = {}) {
   *     this.id = data.id || ''
   *     this.firstName = data.firstName || ''
   *     this.familyName = data.familyName || ''
   *   }
   * }
   */
  static toJson(data: { [key: string]: any }): any {
    throw appErrorTree.NOT_IMPLEMENTED
  }
}
