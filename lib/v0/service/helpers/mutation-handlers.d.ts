import { Mapper, CallMutation, AfterMutationCalled } from '../../types';
interface DocumentCriteria<T> {
    snapshot: firebase.firestore.DocumentSnapshot;
    callMutation: CallMutation;
    isLast?: boolean;
    type?: firebase.firestore.DocumentChangeType;
    mapper?: Mapper<T>;
    afterMutationCalled?: AfterMutationCalled;
}
interface CollectionCriteria<T> {
    snapshot: firebase.firestore.QuerySnapshot;
    callMutation: CallMutation;
    notifyNotFound: () => void;
    mapper?: Mapper<T>;
    afterMutationCalled?: AfterMutationCalled;
}
export declare const callDocumentMutation: <T = any>({ snapshot, callMutation, isLast, type, mapper, afterMutationCalled }: DocumentCriteria<T>) => void;
export declare const callCollectionMutation: <T = any>({ snapshot, callMutation, mapper, afterMutationCalled, notifyNotFound }: CollectionCriteria<T>) => void;
export {};
