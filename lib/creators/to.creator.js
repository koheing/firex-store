"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const services_1 = require("../services");
const firebase = require("firebase");
/**
 * @description return FirestoreAdder or FirestoreDocumentWriterFacade instance
 * Return FirestoreAdder instance if ref is firebase.firestore.CollectionReference,
 * while return FirestoreDocumentWriterFacade if if ref is firebase.firestore.DocumentReference
 * @param ref: firebase.firestore.DocumentReference | firebase.firestore.CollectionReference
 * @returns `FirestoreAdder` or `FirestoreDocumentWriterFacade`
 */
exports.to = (ref) => (ref instanceof firebase.firestore.CollectionReference
    ? new services_1.FirestoreAdder(ref)
    : new helpers_1.FirestoreDocumentWriterFacade(ref));
