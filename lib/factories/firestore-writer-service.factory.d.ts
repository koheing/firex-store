import { FirestoreSetter, FirestoreAdder, FirestoreMergeSetter } from '../services';
import * as firebase from 'firebase';
import { DocumentOrCollection } from '../types';
declare type AdderOrSetterOn<T> = T extends firebase.firestore.DocumentReference ? FirestoreSetter : FirestoreAdder;
declare type MergeSetterOrError<T> = T extends firebase.firestore.DocumentReference ? FirestoreMergeSetter : void;
export declare class FirestoreWriterFactory<T extends DocumentOrCollection> {
    private _ref;
    constructor(ref: T);
    newData(): AdderOrSetterOn<T>;
    existingData(): MergeSetterOrError<T>;
}
export {};
