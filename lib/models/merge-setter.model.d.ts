import { AppErrorOr } from '../types';
import { SetOptionsParameter } from '../parameters';
import { FirestoreMapper } from './firestore-mapper.model';
export interface MergeSetter {
    readonly ref: firebase.firestore.DocumentReference;
    mergeSet: <T>(data: any, options?: SetOptionsParameter<T>) => Promise<AppErrorOr<void>>;
    mapOf: <T extends FirestoreMapper>(className: T) => this;
}
