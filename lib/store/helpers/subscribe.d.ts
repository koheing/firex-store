import { Commit } from 'vuex';
import { FirestoreRef } from '../../types';
import { SubscribeCriteriaOptions } from '../../options';
interface Criteria<T, U> {
    state: any;
    commit: Commit;
    ref: T;
    options?: SubscribeCriteriaOptions<U>;
}
export declare const subscribeFirestore: <T = any>({ state, commit, ref, options }: Criteria<FirestoreRef, T>) => void;
export {};
