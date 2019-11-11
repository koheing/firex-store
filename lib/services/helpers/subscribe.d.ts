import { Commit } from 'vuex';
import { SubscribeOptionsParameter } from '../../parameters';
interface SubscribeParameter<T, U> {
    statePropName: string;
    state: any;
    commit: Commit;
    ref: T;
    options?: SubscribeOptionsParameter<U>;
}
export declare const subscribeFirestoreCollection: <T = any>({ statePropName, state, commit, ref, options }: SubscribeParameter<import("firebase").firestore.CollectionReference | import("firebase").firestore.Query, T>) => void;
export declare const subscribeFirestoreDocument: <T = any>({ statePropName, state, commit, ref, options }: SubscribeParameter<import("firebase").firestore.DocumentReference, T>) => void;
export {};
