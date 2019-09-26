import { FireMutation } from '../types';
import { Unsubscribe } from 'firebase';
import { CriteriaOptions } from '../options';
interface SubscribeCriteria<T, U> extends CriteriaOptions<T> {
    ref: U;
    fireMutation: FireMutation;
}
interface FindCriteria<T, U> extends CriteriaOptions<T> {
    ref: U;
}
export declare class FirestoreService {
    static subscribe<T = any>({ ref, fireMutation, mapper, errorHandler, onCompleted }: SubscribeCriteria<T, firebase.firestore.DocumentReference>): Unsubscribe;
    static subscribeAll<T = any>({ ref, fireMutation, mapper, errorHandler, onCompleted }: SubscribeCriteria<T, firebase.firestore.CollectionReference | firebase.firestore.Query>): Unsubscribe;
    static find<T = any>({ ref, mapper, errorHandler, onCompleted }: FindCriteria<T, firebase.firestore.DocumentReference>): Promise<T | any>;
    static findAll<T = any>({ ref, mapper, errorHandler, onCompleted }: FindCriteria<T, firebase.firestore.CollectionReference | firebase.firestore.Query>): Promise<T[] | any | any[]>;
}
export {};
