import { ActionTree } from 'vuex';
import { SubscribeCriteriaOptions } from '../../options';
import { FirestoreSubscriber } from '../../services/firestore-subscriber.service';
interface CriteriaOptions<T> extends SubscribeCriteriaOptions<T> {
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
export declare const firestoreSubscribeAction: (firestoreSubscriber: FirestoreSubscriber, options?: CriteriaOptions<any> | undefined) => ActionTree<any, any>;
export {};
