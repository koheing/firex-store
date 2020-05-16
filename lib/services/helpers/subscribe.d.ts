import { Context } from '../../types';
import { Commit } from 'vuex';
import { SubscribeOptionsParameter } from '../../parameters';
import { Action } from 'stream-executor';
interface ProcedureParameter<T, U> {
    statePropName: string;
    state: any;
    commit: Commit;
    ref: T;
    options: SubscribeOptionsParameter<U>;
}
interface StreamParameter<T> {
    commit: Commit;
    ref: T;
    setUnsubscriber: (statePropName: string) => void;
    actions: Action<Context<any>, Context<any>>[];
    options: SubscribeOptionsParameter<any>;
}
export declare const createSubscriber: () => {
    asProcedure: () => {
        subscribeFirestoreCollection: <T = any>({ statePropName, commit, ref, options, }: ProcedureParameter<import("firebase").firestore.CollectionReference<import("firebase").firestore.DocumentData> | import("firebase").firestore.Query<import("firebase").firestore.DocumentData>, T>) => import("../../types").Unsubscribe;
        subscribeFirestoreDocument: <T_1 = any>({ statePropName, commit, ref, options, }: ProcedureParameter<import("firebase").firestore.DocumentReference<import("firebase").firestore.DocumentData>, T_1>) => import("../../types").Unsubscribe;
    };
    asStream: () => {
        subscribeFirestoreCollection: ({ commit, setUnsubscriber, actions, ref, options, }: StreamParameter<firebase.firestore.Query | firebase.firestore.CollectionReference>) => import("../../types").Unsubscribe;
        subscribeFirestoreDocument: ({ commit, setUnsubscriber, actions, ref, options, }: StreamParameter<firebase.firestore.DocumentReference>) => import("../../types").Unsubscribe;
    };
};
export {};
