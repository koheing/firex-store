import { FirestoreRef } from '../types';
import { FindCriteriaOptions } from '../options';
export interface Finder {
    readonly ref: FirestoreRef;
    find: <T = any>(options?: FindCriteriaOptions<T>) => Promise<any>;
}
