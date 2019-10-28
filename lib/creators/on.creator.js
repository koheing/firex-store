"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
/**
 * @description return FirestoreUnsubscriber instance
 * @param statePropName state property bound to firestore data
 * @returns FirestoreUnsubscriber
 */
exports.on = (statePropName) => services_1.FirestoreUnsubscriber.on(statePropName);
