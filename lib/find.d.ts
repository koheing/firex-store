import { FindCriteriaOptions } from './options';
import { FirestoreRef, NullOr } from './types';
interface Criteria<T, U> {
    ref: T;
    options?: FindCriteriaOptions<U>;
}
export declare const findFirestore: <T = any>({ ref, options }: Criteria<FirestoreRef, T>) => Promise<NullOr<T>>;
export {};
