import { CriteriaOptions } from './criteria-options.interface';
import { FirestoreRef } from './types';
interface Criteria<T, U> {
    ref: T;
    options?: CriteriaOptions<U>;
}
export declare const findFirestore: <T = any>({ ref, options }: Criteria<FirestoreRef, T>) => Promise<T>;
export {};
