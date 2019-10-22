import { Unsubscribe } from '../models';
export declare class FirestoreUnsubscriber implements Unsubscribe {
    private _type;
    static unbind(type: 'document' | 'collection'): FirestoreUnsubscriber;
    constructor(type: 'document' | 'collection');
    readonly type: 'document' | 'collection';
    unsubscribe(state: any): void;
}
