import { CallMutation, NullOr, AppErrorOr, DocumentId } from '../types';
import { SubscribeCriteriaOptions, FindCriteriaOptions, CriteriaOptions } from '../options';
interface SubscribeCriteria<T, U> extends SubscribeCriteriaOptions<T> {
    statePropName: string;
    ref: U;
    callMutation: CallMutation;
}
interface FindCriteria<T, U> extends FindCriteriaOptions<T> {
    ref: U;
}
interface AddCriteria<T, U> extends CriteriaOptions<T> {
    data: any;
    ref: U;
}
interface SetCriteria<T, U> extends CriteriaOptions<T> {
    data: any;
    ref: U;
    merge: boolean;
    isTransaction: boolean;
}
export declare class FirestoreRepository {
    static subscribe<T = any>({ statePropName, ref, callMutation, mapper, errorHandler, completionHandler, afterMutationCalled, notFoundHandler }: SubscribeCriteria<T, firebase.firestore.DocumentReference>): firebase.Unsubscribe;
    static subscribeAll<T = any>({ statePropName, ref, callMutation, mapper, errorHandler, completionHandler, afterMutationCalled, notFoundHandler }: SubscribeCriteria<T, firebase.firestore.CollectionReference | firebase.firestore.Query>): firebase.Unsubscribe;
    static find<T = any>({ ref, mapper, errorHandler, completionHandler }: FindCriteria<T, firebase.firestore.DocumentReference>): Promise<NullOr<T | any>>;
    static findAll<T = any>({ ref, mapper, errorHandler, completionHandler }: FindCriteria<T, firebase.firestore.CollectionReference | firebase.firestore.Query>): Promise<NullOr<T[] | any | any[]>>;
    static add<T = any>({ data, ref, mapper, errorHandler, completionHandler }: AddCriteria<T, firebase.firestore.CollectionReference>): Promise<AppErrorOr<DocumentId>>;
    static set<T>({ data, ref, merge, isTransaction, mapper, errorHandler, completionHandler }: SetCriteria<T, firebase.firestore.DocumentReference>): Promise<AppErrorOr<void>>;
}
export {};
