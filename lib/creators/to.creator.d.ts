import { FirestoreWriterFactory } from '../factories';
export declare const to: <T extends import("../types").Either<import("firebase").firestore.DocumentReference, import("firebase").firestore.CollectionReference>>(ref: T) => FirestoreWriterFactory<T>;
