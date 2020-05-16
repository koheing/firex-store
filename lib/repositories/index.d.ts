import { CallMutation, NullOr, AppErrorOr, DocumentId, Unsubscribe, FirestoreRef, MutationHandler } from '../types';
import { SubscribeOptionsParameter, FindOptionsParameter, AddOptionsParameter, SetOptionsParameter, DeleteOptionsParameter } from '../parameters';
import { DocumentResult } from '../models';
interface SubscribeOnceParameter<T, U> extends SubscribeOptionsParameter<T> {
    statePropName: string;
    ref: U;
    callMutation: CallMutation;
}
interface SubscribeParameter<T, U> extends Pick<SubscribeOptionsParameter<T>, 'notFoundHandler' | 'errorHandler' | 'completionHandler'> {
    ref: U;
    mutationHandler: MutationHandler;
}
interface FindParameter<T, U> extends FindOptionsParameter<T> {
    ref: U;
}
interface AddParameter<T, U> extends AddOptionsParameter<T> {
    data: any;
    ref: U;
}
interface SetParameter<T, U> extends SetOptionsParameter<T> {
    data: any;
    ref: U;
    merge: boolean;
    isTransaction: boolean;
}
interface DeleteParamater<T> extends DeleteOptionsParameter {
    ref: T;
    isTransaction: boolean;
}
export declare class FirestoreRepository {
    static subscribe<T = any>({ ref, mutationHandler, errorHandler, completionHandler, notFoundHandler, }: SubscribeParameter<T, firebase.firestore.DocumentReference>): Unsubscribe;
    static subscribeAll<T = any>({ ref, mutationHandler, errorHandler, completionHandler, notFoundHandler, }: SubscribeParameter<T, firebase.firestore.CollectionReference | firebase.firestore.Query>): Unsubscribe;
    static subscribeOnce<T = any>({ statePropName, ref, callMutation, mapper, errorHandler, completionHandler, afterMutationCalled, notFoundHandler, }: SubscribeOnceParameter<T, FirestoreRef>): Promise<NullOr<Error | T | T[] | DocumentResult | DocumentResult[]>>;
    static find<T = any>({ ref, mapper, errorHandler, completionHandler, }: FindParameter<T, firebase.firestore.DocumentReference>): Promise<NullOr<T | DocumentResult | Error>>;
    static findAll<T = any>({ ref, mapper, errorHandler, completionHandler, }: FindParameter<T, firebase.firestore.CollectionReference | firebase.firestore.Query>): Promise<NullOr<T[] | DocumentResult[] | Error>>;
    static add<T = any>({ data, ref, mapper, errorHandler, completionHandler, }: AddParameter<T, firebase.firestore.CollectionReference>): Promise<AppErrorOr<DocumentId>>;
    static set<T>({ data, ref, merge, isTransaction, mapper, errorHandler, completionHandler, }: SetParameter<T, firebase.firestore.DocumentReference>): Promise<AppErrorOr<void>>;
    static delete({ ref, isTransaction, errorHandler, completionHandler, }: DeleteParamater<firebase.firestore.DocumentReference>): Promise<AppErrorOr<void>>;
}
export {};
