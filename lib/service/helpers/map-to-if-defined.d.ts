import { Mapper } from '../../types';
import { DocumentResult } from '../../models';
export declare const mapToIfDefined: <T = any>(documentSnapshot: import("firebase").firestore.DocumentSnapshot | import("firebase").firestore.QueryDocumentSnapshot, mapper?: Mapper<T> | undefined) => DocumentResult;
