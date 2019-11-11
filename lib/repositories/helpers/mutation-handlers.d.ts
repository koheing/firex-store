import { Mapper, CallMutation, AfterMutationCalled } from '../../types';
interface DocumentParameter<T> {
    statePropName: string;
    snapshot: firebase.firestore.DocumentSnapshot;
    callMutation: CallMutation;
    isLast?: boolean;
    type?: firebase.firestore.DocumentChangeType;
    mapper?: Mapper<T>;
    afterMutationCalled?: AfterMutationCalled;
}
interface CollectionParameter<T> {
    statePropName: string;
    snapshot: firebase.firestore.QuerySnapshot;
    callMutation: CallMutation;
    notifyNotFound: () => void;
    mapper?: Mapper<T>;
    afterMutationCalled?: AfterMutationCalled;
}
export declare const callDocumentMutation: <T = any>({ statePropName, snapshot, callMutation, isLast, type, mapper, afterMutationCalled }: DocumentParameter<T>) => void;
export declare const callCollectionMutation: <T = any>({ statePropName, snapshot, callMutation, mapper, afterMutationCalled, notifyNotFound }: CollectionParameter<T>) => void;
export {};
