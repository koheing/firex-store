"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transacitonOfDelete = exports.transactionOfSetOrMergeSet = void 0;
const errors_1 = require("../../errors");
const notifications_1 = require("./notifications");
const isAbleToSetOrMergeSet = (isMergeSet, snapshot) => (isMergeSet && snapshot.exists === true) || (!isMergeSet && !snapshot.data());
exports.transactionOfSetOrMergeSet = async ({ ref, data, merge, transaction, errorHandler, }) => {
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
    if (typeof appErrorOrIsAbleToSetOrMergeSet === 'boolean' &&
        appErrorOrIsAbleToSetOrMergeSet === true) {
        transaction.set(ref, data, { merge });
        return;
    }
    const appError = appErrorOrIsAbleToSetOrMergeSet;
    return appError;
};
exports.transacitonOfDelete = async ({ ref, transaction, errorHandler, }) => {
    const appErrorOrIsExisted = await transaction
        .get(ref)
        .then((snapshot) => snapshot.exists)
        .then((isExisted) => {
        if (isExisted) {
            return true;
        }
        throw errors_1.appErrorTree.DATA_NOT_EXISTED;
    })
        .catch((error) => notifications_1.notifyErrorOccurred(error, errorHandler));
    if (typeof appErrorOrIsExisted === 'boolean' &&
        appErrorOrIsExisted === true) {
        transaction.delete(ref);
        return;
    }
    const appError = appErrorOrIsExisted;
    return appError;
};
