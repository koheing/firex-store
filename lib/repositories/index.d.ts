import { CallMutation, NullOr } from '../types';
import { Unsubscribe } from 'firebase';
import { SubscribeCriteriaOptions, FindCriteriaOptions } from '../options';
interface SubscribeCriteria<T, U> extends SubscribeCriteriaOptions<T> {
    statePropName: string;
    ref: U;
    callMutation: CallMutation;
}
interface FindCriteria<T, U> extends FindCriteriaOptions<T> {
    ref: U;
}
export declare class FirestoreRepository {
    static subscribe<T = any>({ statePropName, ref, callMutation, mapper, errorHandler, completionHandler, afterMutationCalled, notFoundHandler }: SubscribeCriteria<T, firebase.firestore.DocumentReference>): Unsubscribe;
    static subscribeAll<T = any>({ statePropName, ref, callMutation, mapper, errorHandler, completionHandler, afterMutationCalled, notFoundHandler }: SubscribeCriteria<T, firebase.firestore.CollectionReference | firebase.firestore.Query>): Unsubscribe;
    static find<T = any>({ ref, mapper, errorHandler, completionHandler }: FindCriteria<T, firebase.firestore.DocumentReference>): Promise<NullOr<T | any>>;
    static findAll<T = any>({ ref, mapper, errorHandler, completionHandler }: FindCriteria<T, firebase.firestore.CollectionReference | firebase.firestore.Query>): Promise<NullOr<T[] | any | any[]>>;
}
export {};
