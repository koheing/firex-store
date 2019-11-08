import { AppErrorOr } from '../types';
import { Setter, Transaction } from '../models';
import { SetCriteriaOptions } from '../options';
export declare class FirestoreSetter implements Setter, Transaction {
    private _ref;
    private _isTransaction;
    static to(ref: firebase.firestore.DocumentReference): FirestoreSetter;
    constructor(ref: firebase.firestore.DocumentReference);
    readonly ref: firebase.firestore.DocumentReference;
    readonly isTransaction: boolean;
    transaction(): FirestoreSetter;
    set<T = any>(data: any, options?: SetCriteriaOptions<T>): Promise<AppErrorOr<void>>;
}
