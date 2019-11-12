import { FirestoreRef } from '../types';
import { FindOptionsParameter } from '../parameters';
export interface Finder {
    readonly ref: FirestoreRef;
    find: <T = any>(options?: FindOptionsParameter<T>) => Promise<any>;
}
