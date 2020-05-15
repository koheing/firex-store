import { Mapper } from '../../types';
import { DocumentResult } from '../../models';
export declare const toDocumentResult: <T = any>(snapshot: firebase.firestore.DocumentSnapshot | firebase.firestore.QueryDocumentSnapshot, mapper?: Mapper<T> | undefined) => DocumentResult;
