import { MutationType } from '../../types';
import { ActionTree } from 'vuex';
interface Criteria {
    type: MutationType;
    actionName?: string;
}
export declare const firestoreUnsubscribeActions: ({ type, actionName }: Criteria) => ActionTree<any, any>;
export {};
