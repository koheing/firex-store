"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../errors");
const notifications_1 = require("./notifications");
exports.transactionOfSet = async ({ ref, data, merge, transaction, errorHandler }) => {
    const isMergeSetAction = merge;
    const appErrorOrIsNotExist = await transaction
        .get(ref)
        .then((snapshot) => (isMergeSetAction && snapshot.exists === true) ||
        (!isMergeSetAction && !snapshot.data())
        ? true
        : false)
        .then((isAbleToSet) => {
        if (isAbleToSet) {
            return true;
        }
        const appError = {
            name: 'document id error',
            message: isMergeSetAction
                ? errors_1.THIS_ID_DOES_NOT_EXIST
                : errors_1.THIS_ID_HAS_BEEN_ALREADY_USED
        };
        throw appError;
    })
        .catch((error) => notifications_1.notifyErrorOccurred(error, errorHandler));
    if (appErrorOrIsNotExist === true) {
        transaction.set(ref, data, { merge });
        return;
    }
    const appError = appErrorOrIsNotExist;
    return appError;
};
