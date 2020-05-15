import { MutationType } from '../../types';
import { ActionTree } from 'vuex';
interface Criteria {
    type: MutationType;
    actionName?: string;
}
/**
 * @warn It is deprecated. It will be removed at `^1.0.0~`
 *  unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param actionName can undefined. But if you define actionName in `firestoreSubscribeActions`, set same name.
 */
export declare const firestoreUnsubscribeActions: ({ type, actionName, }: Criteria) => ActionTree<any, any>;
/**
 *  unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param actionName can undefined. But if you define actionName in `firestoreSubscribeAction`, set same name.
 */
export declare const firestoreUnsubscribeAction: ({ type, actionName, }: Criteria) => ActionTree<any, any>;
export {};
