import { ActionTree } from 'vuex';
import { CriteriaOptions } from '../../options';
import { FirestoreRef } from '../../types';
interface Criteria<T = any> {
    ref: FirestoreRef;
    actionName?: string;
    options?: CriteriaOptions<T>;
}
export declare const firestoreSubscribeActions: <T = any>({ ref, actionName, options }: Criteria<T>) => ActionTree<any, any>;
export {};
