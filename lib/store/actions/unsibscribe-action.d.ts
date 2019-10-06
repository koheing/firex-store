import { MutationType } from '../../types';
import { ActionTree } from 'vuex';
interface Criteria {
    type: MutationType;
    actionName?: string;
}
/**
 * @description unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param actionName can undefined. But if you define actionName in `firestoreSubscribeActions`, set same name.
 */
export declare const firestoreUnsubscribeActions: ({ type, actionName }: Criteria) => ActionTree<any, any>;
export {};
