import { Unsubscriber } from '../models';
/**
 * Class unsubscribe firestore data to state property
 *
 * @example
 *   FirestoreUnsubscriber
 *     .on('statePropName')
 *     .unsubscribe(state)
 */
export declare class FirestoreUnsubscriber implements Unsubscriber {
    private _statePropName;
    /**
     * Make FirestoreUnsubscriber instance
     * @param statePropName: string
     * @returns FirestoreUnsubscriber
     */
    static on(statePropName: string): FirestoreUnsubscriber;
    constructor(statePropName: string);
    readonly statePropName: string;
    /**
     * Unsubscribe firestore data
     * @param state: any
     */
    unsubscribe(state: any): void;
}
