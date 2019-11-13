"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const notifications_1 = require("./notifications");
const isAbleToSetOrMergeSet = (isMergeSet, snapshot) => (isMergeSet && snapshot.exists === true) || (!isMergeSet && !snapshot.data());
exports.transactionOfSetOrMergeSet = async ({ ref, data, merge, transaction, errorHandler }) => {
    const isMergeSet = merge;
    const appErrorOrIsAbleToSetOrMergeSet = await transaction
        .get(ref)
        .then((snapshot) => isAbleToSetOrMergeSet(isMergeSet, snapshot))
        .then((isAbleToSet) => {
        if (isAbleToSet) {
            return true;
        }
        const appError = merge
            ? errors_1.appErrorTree.DATA_EXISTED
            : errors_1.appErrorTree.ID_HAS_ALREADY_BEEN_USED;
        throw appError;
    })
        .catch((error) => notifications_1.notifyErrorOccurred(error, errorHandler));
    if (appErrorOrIsAbleToSetOrMergeSet === true) {
        transaction.set(ref, data, { merge });
        return;
    }
    const appError = appErrorOrIsAbleToSetOrMergeSet;
    return appError;
};
