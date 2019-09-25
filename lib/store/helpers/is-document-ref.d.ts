import { FirestoreRef } from '../../types';
import * as firebase from 'firebase';
export declare const isDocumentRef: (ref: FirestoreRef) => ref is firebase.firestore.DocumentReference;
