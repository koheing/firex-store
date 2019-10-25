import { Unsubscribe } from '../models';
/**
 * @description class unsubscribe firestore data to state property
 *
 * @example
 *   FirestoreUnsubscriber
 *     .unbind('comments')
 *     .unsubscribe(state)
 */
export declare class FirestoreUnsubscriber implements Unsubscribe {
    private _statePropName;
    /**
     * @description Make FirestoreUnsubscriber instance
     * @param statePropName: string
     * @returns FirestoreUnsubscriber
     */
    static unbind(statePropName: string): FirestoreUnsubscriber;
    constructor(statePropName: string);
    readonly statePropName: string;
    /**
     * @description unsubscribe firestore data
     * @param state: any
     */
    unsubscribe(state: any): void;
}
