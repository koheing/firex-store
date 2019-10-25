import { Unsubscribe } from '../models'
import { FIREX_UNSUBSCRIBERS } from '../configurations'
import { Unsubscribers } from '../types'
import { UNSUBSCRIBE_METHOD_NOT_CALLED } from '../errors'

/**
 * @description class unsubscribe firestore data to state property
 *
 * @example
 *   FirestoreUnsubscriber
 *     .unbind('comments')
 *     .unsubscribe(state)
 */
export class FirestoreUnsubscriber implements Unsubscribe {
  private _statePropName: string

  /**
   * @description Make FirestoreUnsubscriber instance
   * @param statePropName: string
   * @returns FirestoreUnsubscriber
   */
  static unbind(statePropName: string): FirestoreUnsubscriber {
    return new FirestoreUnsubscriber(statePropName)
  }

  constructor(statePropName: string) {
    this._statePropName = statePropName
  }

  get statePropName(): string {
    return this._statePropName
  }

  /**
   * @description unsubscribe firestore data
   * @param state: any
   */
  unsubscribe(state: any) {
    const unsubscribers: Unsubscribers | undefined = state[FIREX_UNSUBSCRIBERS]
    if (!unsubscribers || unsubscribers.has(this.statePropName) === false) {
      console.error(UNSUBSCRIBE_METHOD_NOT_CALLED)
      return
    }

    const unsubscribe = unsubscribers.get(this.statePropName)
    if (unsubscribe) {
      unsubscribe()
    }
    unsubscribers.delete(this.statePropName)
  }
}
