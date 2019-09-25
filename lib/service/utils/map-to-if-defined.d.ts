import { Mapper } from '../../types';
export declare const mapToIfDefined: <T = any>(documentSnapshot: import("firebase").firestore.DocumentSnapshot | import("firebase").firestore.QueryDocumentSnapshot, mapper?: Mapper<T> | undefined) => any;
