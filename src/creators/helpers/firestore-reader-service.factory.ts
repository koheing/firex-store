import { FirestoreRef, Context } from '../../types'
import {
  FirestoreSubscriber,
  FirestoreFinder,
  FirestoreStreamSubscriber
} from '../../services'
import { Action } from 'stream-executor'

/**
 * Factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @method bindTo(statePropName): return FirestoreSubscriber
 * @method once: return FirestoreFinder
 */
export class FirestoreReaderServiceFactory {
  private _ref: FirestoreRef

  constructor(ref: FirestoreRef) {
    this._ref = ref
  }

  /**
   * Return FirestoreSubscriber instance
   * @param statePropName: state property bound to firestore data
   * @return FirestoreSubscriber
   */
  bindTo(statePropName: string): FirestoreSubscriber {
    return FirestoreSubscriber.from(this._ref).bindTo(statePropName)
  }

  /**
   * Return FirestoreFinder instance
   * @return FirestoreFinder
   */
  once(): FirestoreFinder {
    return FirestoreFinder.from(this._ref)
  }

  stream<A, B, C, D, E, F, G, H, I, J>(
    act1: Action<Context<{ docId: string } & Record<string, any>>, A>,
    act2?: Action<A, B>,
    act3?: Action<B, C>,
    act4?: Action<C, D>,
    act5?: Action<D, E>,
    act6?: Action<E, F>,
    act7?: Action<F, G>,
    act8?: Action<G, H>,
    act9?: Action<H, I>,
    act10?: Action<I, J>
  ) {
    return FirestoreStreamSubscriber.from(this._ref).stream(
      act1,
      act2,
      act3,
      act4,
      act5,
      act6,
      act7,
      act8,
      act9,
      act10
    )
  }
}
