"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyNotFound = (type, notFoundHandler, isAll) => notFoundHandler
    ? notFoundHandler(type, isAll)
    : console.log(type === 'document' || (type === 'collection' && isAll === true)
        ? 'DATA NOT FOUND'
        : 'PARTIAL DATA NOT FOUND');
exports.notifyErrorOccurred = (error, errorHandler) => errorHandler ? errorHandler(error) : console.error(error);
exports.notifyCompletionIfDefined = (completionHandler) => {
    if (completionHandler) {
        completionHandler();
    }
};
