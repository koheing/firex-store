"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const notifications_1 = require("./notifications");
const isAbleToSet = (isMergeSet, snapshot) => (isMergeSet && snapshot.exists === true) || (!isMergeSet && !snapshot.data());
exports.transactionOfSet = async ({ ref, data, merge, transaction, errorHandler }) => {
    const isMergeSet = merge;
    const appErrorOrIsAbleToSet = await transaction
        .get(ref)
        .then((snapshot) => isAbleToSet(isMergeSet, snapshot))
        .then((isAbleToSet) => {
        if (isAbleToSet) {
            return true;
        }
        const appError = {
            name: 'document id error',
            message: merge ? errors_1.THIS_ID_DOES_NOT_EXIST : errors_1.THIS_ID_HAS_BEEN_ALREADY_USED
        };
        throw appError;
    })
        .catch((error) => notifications_1.notifyErrorOccurred(error, errorHandler));
    if (appErrorOrIsAbleToSet === true) {
        transaction.set(ref, data, { merge });
        return;
    }
    const appError = appErrorOrIsAbleToSet;
    return appError;
};
