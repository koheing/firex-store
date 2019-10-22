import { Subscribe } from '../models';
import { FirestoreRef } from '../types';
import { Commit } from 'vuex';
import { SubscribeCriteriaOptions } from '../options';
export declare class FirestoreSubscriber implements Subscribe {
    private _ref;
    private _statePropName?;
    static from(ref: FirestoreRef): FirestoreSubscriber;
    constructor(ref: FirestoreRef);
    readonly ref: FirestoreRef;
    readonly statePropName: string | undefined;
    bindTo(statePropName: string): FirestoreSubscriber;
    subscribe<T = any>(state: any, commit: Commit, options?: SubscribeCriteriaOptions<T>): void;
    isDocumentRef(): boolean;
}
