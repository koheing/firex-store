import { ActionTree } from 'vuex';
import { FirestoreUnsubscriber } from '../../services/firestore-unsubscriber.service';
/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param options: { actionName: string } | undefined
 *
 * @example
 *   actions: {
 *     ...firestoreUnsubscribeAction(
 *       FirestoreUnsubscriber
 *         .unbind('collection'),
 *       { actionName: 'subscribeAll' }
 *     )
 *   }
 *
 */
export declare const firestoreUnsubscribeAction: (firestoreUnsubscriber: FirestoreUnsubscriber, options?: {
    actionName: string;
} | undefined) => ActionTree<any, any>;
