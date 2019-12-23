import { Mapper } from '../../types';
import { DocumentResult } from '../../models';
export declare const toDocumentResult: <T = any>(snapshot: import("firebase").firestore.QueryDocumentSnapshot<import("firebase").firestore.DocumentData> | import("firebase").firestore.DocumentSnapshot<import("firebase").firestore.DocumentData>, mapper?: Mapper<T> | undefined) => DocumentResult | T;
