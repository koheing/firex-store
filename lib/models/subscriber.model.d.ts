import { Commit } from 'vuex';
import { SubscribeOptionsParameter } from '../parameters';
import { FirestoreRef } from '../types';
import { FirestoreMapper } from './firestore-mapper.model';
export interface Subscriber {
    readonly ref: FirestoreRef;
    readonly statePropName: string | undefined;
    bindTo: (statePropName: string) => this;
    subscribe: <T = any>(state: any, commit: Commit, options?: SubscribeOptionsParameter<T>) => void;
    mapOf: <T extends FirestoreMapper>(mapper: T) => this;
    isDocumentRef(): boolean;
}
