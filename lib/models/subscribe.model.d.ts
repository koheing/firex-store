import { Commit } from 'vuex';
import { SubscribeCriteriaOptions } from '../options';
import { FirestoreRef } from '../types';
export interface Subscribe {
    readonly ref: FirestoreRef;
    readonly statePropName: string | undefined;
    bindTo: (statePropName: string) => any;
    subscribe: <T = any>(state: any, commit: Commit, options?: SubscribeCriteriaOptions<T>) => void;
    isDocumentRef(): boolean;
}
