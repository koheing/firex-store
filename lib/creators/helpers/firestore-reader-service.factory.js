"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
/**
 * @description factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @method bindTo(statePropName): return FirestoreSubscriber
 * @method once: return FirestoreFinder
 */
class FirestoreReaderServiceFactory {
    constructor(ref) {
        this._ref = ref;
    }
    /**
     * @description return FirestoreSubscriber instance
     * @param statePropName: state property bound to firestore data
     * @return FirestoreSubscriber
     */
    bindTo(statePropName) {
        return services_1.FirestoreSubscriber.from(this._ref).bindTo(statePropName);
    }
    /**
     * @description return FirestoreFinder instance
     * @return FirestoreFinder
     */
    once() {
        return services_1.FirestoreFinder.from(this._ref);
    }
}
exports.FirestoreReaderServiceFactory = FirestoreReaderServiceFactory;
