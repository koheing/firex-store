import { FirestoreRef } from '../types';
import { FindOptionsParameter } from '../parameters';
import { FirestoreMapper } from './firestore-mapper.model';
export interface Finder {
    readonly ref: FirestoreRef;
    find: <T = any>(options?: FindOptionsParameter<T>) => Promise<any>;
    mapOf: <T extends FirestoreMapper>(className: T) => this;
}
