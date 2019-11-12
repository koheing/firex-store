import { AppErrorOr } from '../../types';
import { OptionsParameter } from '../../parameters';
interface TransactionParameter<T> extends OptionsParameter<T> {
    transaction: firebase.firestore.Transaction;
    data: any;
    ref: firebase.firestore.DocumentReference;
    merge: boolean;
}
export declare const transactionOfSetOrMergeSet: <T = any>({ ref, data, merge, transaction, errorHandler }: TransactionParameter<T>) => Promise<AppErrorOr<void>>;
export {};
