import { Unsubscriber } from '../models'
import { FIREX_UNSUBSCRIBES } from '../configurations'
import { Unsubscribes } from '../types'
import { UNSUBSCRIBE_METHOD_NOT_CALLED } from '../errors'

/**
 * @description class unsubscribe firestore data to state property
 *
 * @example
 *   FirestoreUnsubscriber
 *     .on('comments')
 *     .unsubscribe(state)
 */
export class FirestoreUnsubscriber implements Unsubscriber {
  private _statePropName: string

  /**
   * @description Make FirestoreUnsubscriber instance
   * @param statePropName: string
   * @returns FirestoreUnsubscriber
   */
  static on(statePropName: string): FirestoreUnsubscriber {
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
    const unsubscribes: Unsubscribes | undefined = state[FIREX_UNSUBSCRIBES]
    if (!unsubscribes || unsubscribes.has(this.statePropName) === false) {
      console.error(UNSUBSCRIBE_METHOD_NOT_CALLED)
      return
    }

    const unsubscribe = unsubscribes.get(this.statePropName)
    if (unsubscribe) {
      unsubscribe()
    }
    unsubscribes.delete(this.statePropName)
  }
}
