import { ActionTree } from 'vuex';
import { FirestoreUnsubscriber } from '../../services/firestore-unsubscriber.service';
/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param actionName: string | undefined
 *
 * @example
 *   actions: {
 *     ...firestoreSubscribeAction(
 *       FirestoreSubscriber
 *         .from(firebase.firestore().collection('/comments'))
 *         .bindTo('comments'),
 *       { actionName: 'subscribeAll' }
 *     )
 *   }
 *
 */
export declare const firestoreUnsubscribeAction: (firestoreUnsubscriber: FirestoreUnsubscriber, actionName?: string | undefined) => ActionTree<any, any>;
