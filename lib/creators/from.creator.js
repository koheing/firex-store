"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
/**
 * @description return factory of FirestoreSubscriber and FirestoreFinder
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @returns FirestoreReaderServiceFactory
 */
exports.from = (ref) => new helpers_1.FirestoreReaderServiceFactory(ref);
