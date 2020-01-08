import { FindCriteriaOptions } from './options';
import { FirestoreRef, NullOr } from './types';
interface Criteria<T, U> {
    ref: T;
    options?: FindCriteriaOptions<U>;
}
/**
 *  fetch firestore data at once
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - onCompleted `deprecated`
 */
export declare const findFirestore: <T = any>({ ref, options }: Criteria<FirestoreRef, T>) => Promise<NullOr<T>>;
export {};
