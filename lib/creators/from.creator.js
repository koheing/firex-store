"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factories_1 = require("../factories");
/**
 * @description return factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @returns FirestoreReaderServiceFactory
 */
exports.from = (ref) => new factories_1.FirestoreReaderServiceFactory(ref);
