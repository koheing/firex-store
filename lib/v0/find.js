"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./service");
const is_document_ref_1 = require("./store/helpers/is-document-ref");
/**
 *  fetch firestore data at once
 * @param ref firebase.firestore.DocumentReference | firebase.firestore.CollectionReference | firebase.firestore.Query
 * @param options optional methods. can undefined
 *   - mapper
 *   - errorHandler
 *   - completionHandler
 *   - onCompleted `deprecated`
 */
exports.findFirestore = ({ ref, options }) => {
    return is_document_ref_1.isDocumentRef(ref)
        ? service_1.FirestoreService.find({ ref, ...options })
        : service_1.FirestoreService.findAll({ ref, ...options });
};
