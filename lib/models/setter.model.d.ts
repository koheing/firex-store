import { AppErrorOr } from '../types';
import { SetOptionsParameter } from '../parameters';
import { FirestoreMapper } from './firestore-mapper.model';
export interface Setter {
    readonly ref: firebase.firestore.DocumentReference;
    set: <T>(data: any, options?: SetOptionsParameter<T>) => Promise<AppErrorOr<void>>;
    mapOf: <T extends FirestoreMapper>(className: T) => this;
}
