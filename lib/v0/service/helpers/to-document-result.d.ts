import { Mapper } from '../../types';
import { DocumentResult } from '../../models';
export declare const toDocumentResult: <T = any>(snapshot: import("firebase").firestore.DocumentSnapshot | import("firebase").firestore.QueryDocumentSnapshot, mapper?: Mapper<T> | undefined) => DocumentResult;
