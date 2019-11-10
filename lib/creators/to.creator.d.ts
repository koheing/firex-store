import { FirestoreDocumentWriterFacade } from './helpers';
import { FirestoreAdder } from '../services';
import * as firebase from 'firebase';
declare type AdderOrSetter<T> = T extends firebase.firestore.CollectionReference ? FirestoreAdder : FirestoreDocumentWriterFacade;
/**
 * @description return FirestoreAdder or FirestoreDocumentWriterFacade instance
 * Return FirestoreAdder instance if ref is firebase.firestore.CollectionReference,
 * while return FirestoreDocumentWriterFacade if if ref is firebase.firestore.DocumentReference
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference
 * @returns `FirestoreAdder` or `FirestoreDocumentWriterFacade`
 */
export declare const to: <T extends import("../types").Either<firebase.firestore.DocumentReference, firebase.firestore.CollectionReference>>(ref: T) => AdderOrSetter<T>;
export {};
