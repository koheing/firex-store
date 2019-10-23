import { Commit } from 'vuex';
import { SubscribeCriteriaOptions } from '../../options';
interface SubscribeCriteria<T, U> {
    statePropName: string;
    state: any;
    commit: Commit;
    ref: T;
    options?: SubscribeCriteriaOptions<U>;
}
export declare const subscribeFirestoreCollection: <T = any>({ statePropName, state, commit, ref, options }: SubscribeCriteria<import("firebase").firestore.CollectionReference | import("firebase").firestore.Query, T>) => void;
export declare const subscribeFirestoreDocument: <T = any>({ statePropName, state, commit, ref, options }: SubscribeCriteria<import("firebase").firestore.DocumentReference, T>) => void;
export {};
