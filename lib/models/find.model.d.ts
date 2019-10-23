import { FirestoreRef } from '../types';
import { FindCriteriaOptions } from '../options';
export interface Find {
    readonly ref: FirestoreRef;
    find: <T = any>(options?: FindCriteriaOptions<T>) => Promise<any>;
}
