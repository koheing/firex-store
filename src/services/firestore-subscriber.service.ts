import { Subscriber, FirestoreMapper } from '../models'
import {
  FirestoreRef,
  Unsubscribes,
  Unsubscribe,
  Mapper,
  CallMutation
} from '../types'
import { Commit } from 'vuex'
import { SubscribeOptionsParameter } from '../parameters'
import { errorMessageTree } from '../errors'
import {
  subscribeFirestoreDocument,
  subscribeFirestoreCollection,
  createMutation
} from './helpers'
import { FIREX_UNSUBSCRIBES } from '../configurations'
import { isDocumentRef } from '../utils/is-document-ref'
import { FirestoreRepository } from '../repositories'

/**
 * Class subscribe firestore data to state property
 *
 * @example
 *    class FirestoreMapperModel extends FirestoreMapper {
 *     id: number
 *     name: string
 *     static fromJson(data: { [key: string]: any }) {
 *        return { id: data.id, name: data.name } as FirestoreMapperModel
 *     }
 *   }
 *
 *   FirestoreSubscriber
 *     .from(firebase.firestore().collection('collection'))
 *     .bindTo('statePropName')
 *     .mapOf(FirestoreMapperModel)  // <- options
 *     .subscribe(state, commit, {
 *         errorHandler,
 *         notFoundHandler,
 *         afterMutationCalled
 *     })
 */
export class FirestoreSubscriber implements Subscriber {
  private _ref: FirestoreRef
  private _statePropName?: string
  private _mapper?: Mapper<any>

  /**
   * Make FirestoreSubscriber instance
   * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
   * @returns FirestoreSubscriber
   */
  static from(ref: FirestoreRef): FirestoreSubscriber {
    return new FirestoreSubscriber(ref)
  }

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

  get ref(): FirestoreRef {
    return this._ref
  }

  get statePropName(): string | undefined {
    return this._statePropName
  }

  /**
   * Set state property bound to firestore data
   * @param statePropName: string
   * @returns FirestoreSubscriber
   */
  bindTo(statePropName: string): this {
    this._statePropName = statePropName
    return this
  }

  /**
   * Convert new data with the results of calling a provided function(fromJson)
   * @param className extends FirestoreMapper
   * @returns FirestoreSubscriber
   */
  mapOf<T extends FirestoreMapper>(className: T): this {
    // @ts-ignore
    this._mapper = className.fromJson
    return this
  }

  /**
   * Subscribe firestore data and bind to state property
   * @param state: any
   * @param commit: Commit
   * @param options: { mapper,
   *         errorHandler,
   *         notFoundHandler,
   *         completionHandler
   *         afterMutationCalled } | undefined
   */
  subscribe<T = any>(
    state: any,
    commit: Commit,
    options?: SubscribeOptionsParameter<T>
  ) {
    if (!this.statePropName) {
      console.error(errorMessageTree.BIND_TO_METHOD_NOT_CALLED)
      return
    }

    if (!state[FIREX_UNSUBSCRIBES]) {
      state[FIREX_UNSUBSCRIBES] = new Map<string, Unsubscribe>()
    }

    if ((state[FIREX_UNSUBSCRIBES] as Unsubscribes).has(this.statePropName)) {
      return
    }

    const _options: SubscribeOptionsParameter<any> = {
      ...options,
      ...{ mapper: this._mapper }
    }

    isDocumentRef(this.ref)
      ? subscribeFirestoreDocument<T>({
          statePropName: this.statePropName,
          state,
          commit,
          ref: this.ref,
          options: _options
        })
      : subscribeFirestoreCollection<T>({
          statePropName: this.statePropName,
          state,
          commit,
          ref: this.ref,
          options: _options
        })
  }

  async subscribeOnce<T = any>(
    commit: Commit,
    options?: SubscribeOptionsParameter<T>
  ) {
    if (!this.statePropName) {
      console.error(errorMessageTree.BIND_TO_METHOD_NOT_CALLED)
      return
    }

    const _options: SubscribeOptionsParameter<any> = {
      ...options,
      ...{ mapper: this._mapper }
    }

    const mutationType = 'document'
    const callMutation: CallMutation = createMutation({ mutationType, commit })

    await FirestoreRepository.subscribeOnce<T>({
      statePropName: this.statePropName,
      ref: this.ref,
      callMutation,
      ..._options
    })
  }

  isDocumentRef(): boolean {
    return isDocumentRef(this.ref)
  }
}
