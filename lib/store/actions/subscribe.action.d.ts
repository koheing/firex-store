import { ActionTree } from 'vuex';
import { SubscribeOptionsParameter } from '../../parameters';
import { FirestoreSubscriber } from '../../services/firestore-subscriber.service';
interface OptionsParameter<T> extends SubscribeOptionsParameter<T> {
    /**
     * @param actionName action name registered to ActionTree
     */
    actionName?: string;
}
/**
 * @description subscribe firestore data to state property
 * @param firestoreSubscriber: FirestoreSubscriber instance
 * @param options: {
 *         actionName,
 *         mapper,
 *         errorHandler,
 *         notFoundHandler,
 *         completionHandler
 *         afterMutationCalled } | undefined
 * @returns ActionTree<any, any>
 *
 * @example
 *   import { firestoreSubscribeAction, FirestoreSubscriber, from } from 'firex-store'
 *   actions: {
 *     ...firestoreSubscribeAction(
 *       FirestoreSubscriber
 *         .from(firebase.firestore().collection('collection'))
 *         .bindTo('statePropName'),
 *       { actionName: 'customActionName' }
 *     ),
 *     ...firestoreSubscribeAction(
 *       from(firebase.firestore().collection('collection'))
 *         .bindTo('statePropName'),
 *       { actionName: 'customActionName2' }
 *     )
 *   }
 *
 */
export declare const firestoreSubscribeAction: (firestoreSubscriber: FirestoreSubscriber, options?: OptionsParameter<any> | undefined) => ActionTree<any, any>;
export {};
