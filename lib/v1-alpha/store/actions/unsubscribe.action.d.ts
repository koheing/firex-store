import { ActionTree } from 'vuex';
import { FirestoreUnsubscriber } from '../../services/firestore-unsubscriber.service';
export declare const firestoreUnsubscribeAction: (unsubscriber: FirestoreUnsubscriber, actionName?: string | undefined) => ActionTree<any, any>;
