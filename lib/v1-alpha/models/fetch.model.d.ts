import { FirestoreRef } from '../types';
import { FindCriteriaOptions } from '../options';
export interface Fetch {
    readonly ref: FirestoreRef;
    fetch: <T = any>(options?: FindCriteriaOptions<T>) => Promise<any>;
}
