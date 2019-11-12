import { Commit } from 'vuex';
import { SubscribeCriteriaOptions } from '../../options';
interface Criteria<T, U> {
    state: any;
    commit: Commit;
    ref: T;
    options?: SubscribeCriteriaOptions<U>;
}
/**
 *  subscribe firestore data to state property
 * @param state vuex's state
 * @param commit vuex's commit
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - notFoundHandler
 *   - afterMutationCalled
 *   - onCompleted `deprecated`
 */
export declare const subscribeFirestore: <T = any>({ state, commit, ref, options }: Criteria<import("../../../types").FirestoreRef, T>) => void;
export {};
