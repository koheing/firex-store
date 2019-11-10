import { AppErrorOr } from '../../types';
import { CriteriaOptions } from '../../options';
interface TransactionCriteria<T> extends CriteriaOptions<T> {
    transaction: firebase.firestore.Transaction;
    data: any;
    ref: firebase.firestore.DocumentReference;
    merge: boolean;
}
export declare const transactionOfSet: <T = any>({ ref, data, merge, transaction, errorHandler }: TransactionCriteria<T>) => Promise<AppErrorOr<void>>;
export {};
