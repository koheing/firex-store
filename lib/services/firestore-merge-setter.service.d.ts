import { AppErrorOr } from '../types';
import { MergeSetter, Transaction } from '../models';
import { SetCriteriaOptions } from '../options';
export declare class FirestoreMergeSetter implements MergeSetter, Transaction {
    private _ref;
    private _isTransaction;
    static to(ref: firebase.firestore.DocumentReference): FirestoreMergeSetter;
    constructor(ref: firebase.firestore.DocumentReference);
    readonly ref: firebase.firestore.DocumentReference;
    readonly isTransaction: boolean;
    transaction(): FirestoreMergeSetter;
    mergeSet<T = any>(data: any, options?: SetCriteriaOptions<T>): Promise<AppErrorOr<void>>;
}
