import { ActionTree } from 'vuex';
import { FirestoreUnsubscriber } from '../../services/firestore-unsubscriber.service';
/**
 * @description unsubscribe firestore data to state property
 * @param firestoreUnsubscriber: FirestoreUnsubscriber instance
 * @param criteria: { type: 'document' | 'collection', actionName?: string }
 *
 * @example
 *   actions: {
 *     ...firestoreUnsubscribeAction(
 *       FirestoreUnsubscriber
 *         .unbind('comments'),
 *       { type: 'collection', actionName: 'subscribeAll' }
 *     )
 *   }
 *
 */
export declare const firestoreUnsubscribeAction: (firestoreUnsubscriber: FirestoreUnsubscriber, criteria: {
    type: "document" | "collection";
    actionName?: string | undefined;
}) => ActionTree<any, any>;
