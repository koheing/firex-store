import { Unsubscribe } from '../models';
/**
 * @description class unsubscribe firestore data to state property
 *
 * @example
 *   FirestoreUnsubscriber
 *     .unbind('collection')
 *     .unsubscribe(state)
 */
export declare class FirestoreUnsubscriber implements Unsubscribe {
    private _type;
    /**
     * @description Make FirestoreUnsubscriber instance
     * @param type: 'document' | 'collection'
     * @returns FirestoreUnsubscriber
     */
    static unbind(type: 'document' | 'collection'): FirestoreUnsubscriber;
    constructor(type: 'document' | 'collection');
    readonly type: 'document' | 'collection';
    /**
     * @description unsubscribe firestore data
     * @param state: any
     */
    unsubscribe(state: any): void;
}
