import { AppErrorOr, DocumentId } from '../types';
import { Adder } from '../models';
import { AddCriteriaOptions } from '../options';
export declare class FirestoreAdder implements Adder {
    private _ref;
    static to(ref: firebase.firestore.CollectionReference): FirestoreAdder;
    constructor(ref: firebase.firestore.CollectionReference);
    readonly ref: firebase.firestore.CollectionReference;
    add<T = any>(data: any, options?: AddCriteriaOptions<T>): Promise<AppErrorOr<DocumentId>>;
}
