"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase");
exports.isDocumentRef = (ref) => ref instanceof firebase.firestore.DocumentReference;
