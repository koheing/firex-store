import { Commit } from 'vuex';
import { FirestoreRef } from '../../types';
import { CriteriaOptions } from '../../criteria-options.interface';
interface Criteria<T, U> {
    state: any;
    commit: Commit;
    ref: T;
    options?: CriteriaOptions<U>;
}
export declare const subscribeFirestore: <T = any>({ state, commit, ref, options }: Criteria<FirestoreRef, T>) => void;
export {};
