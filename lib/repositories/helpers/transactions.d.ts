import { AppErrorOr, ErrorHandler } from '../../types';
import { OptionsParameter } from '../../parameters';
interface SetTransactionParameter<T> extends OptionsParameter<T> {
    transaction: firebase.firestore.Transaction;
    data: any;
    ref: firebase.firestore.DocumentReference;
    merge: boolean;
}
interface DeleteTransactionParameter {
    transaction: firebase.firestore.Transaction;
    ref: firebase.firestore.DocumentReference;
    errorHandler?: ErrorHandler;
}
export declare const transactionOfSetOrMergeSet: <T = any>({ ref, data, merge, transaction, errorHandler }: SetTransactionParameter<T>) => Promise<AppErrorOr<void>>;
export declare const transacitonOfDelete: ({ ref, transaction, errorHandler }: DeleteTransactionParameter) => Promise<AppErrorOr<void>>;
export {};
