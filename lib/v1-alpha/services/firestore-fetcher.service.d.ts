import { Fetch } from '../models';
import { FirestoreRef } from '../types';
import { FindCriteriaOptions } from '../options';
export declare class FirestoreFetcher implements Fetch {
    private _ref;
    static where(ref: FirestoreRef): FirestoreFetcher;
    constructor(ref: FirestoreRef);
    readonly ref: FirestoreRef;
    fetch<T = any>(options?: FindCriteriaOptions<T>): Promise<any>;
}
