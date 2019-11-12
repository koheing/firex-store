import { ActionTree } from 'vuex';
import { SubscribeCriteriaOptions } from '../../options';
import { FirestoreRef } from '../../types';
interface Criteria<T = any> {
    ref: FirestoreRef;
    actionName?: string;
    options?: SubscribeCriteriaOptions<T>;
}
/**
 * @warn It is deprecated. It will be removed at `^1.0.0~`
 *  subscribe firestore data to state property
 * @param actionName custom action name. can undefined
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - notFoundHandler
 *   - afterMutationCalled
 *   - onCompleted `deprecated`
 */
export declare const firestoreSubscribeActions: <T = any>({ ref, actionName, options }: Criteria<T>) => ActionTree<any, any>;
/**
 *  subscribe firestore data to state property
 * @param actionName custom action name. can undefined
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - notFoundHandler
 *   - afterMutationCalled
 *   - onCompleted `deprecated`
 */
export declare const firestoreSubscribeAction: <T = any>({ ref, actionName, options }: Criteria<T>) => ActionTree<any, any>;
export {};
