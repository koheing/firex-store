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
/**
 * @description subscribe firestore data to state property
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
