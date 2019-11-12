"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurations_1 = require("../configurations");
const errors_1 = require("../errors");
/**
 * Class unsubscribe firestore data to state property
 *
 * @example
 *   FirestoreUnsubscriber
 *     .on('statePropName')
 *     .unsubscribe(state)
 */
class FirestoreUnsubscriber {
    constructor(statePropName) {
        this._statePropName = statePropName;
    }
    /**
     * Make FirestoreUnsubscriber instance
     * @param statePropName: string
     * @returns FirestoreUnsubscriber
     */
    static on(statePropName) {
        return new FirestoreUnsubscriber(statePropName);
    }
    get statePropName() {
        return this._statePropName;
    }
    /**
     * Unsubscribe firestore data
     * @param state: any
     */
    unsubscribe(state) {
        const unsubscribes = state[configurations_1.FIREX_UNSUBSCRIBES];
        if (!unsubscribes || !unsubscribes.has(this.statePropName)) {
            console.error(errors_1.UNSUBSCRIBE_METHOD_NOT_CALLED);
            return;
        }
        const unsubscribe = unsubscribes.get(this.statePropName);
        if (unsubscribe) {
            unsubscribe();
        }
        unsubscribes.delete(this.statePropName);
    }
}
exports.FirestoreUnsubscriber = FirestoreUnsubscriber;
