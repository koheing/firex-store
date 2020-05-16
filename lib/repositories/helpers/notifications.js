"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyCompletionIfDefined = exports.notifyErrorOccurred = exports.notifyNotFound = void 0;
exports.notifyNotFound = (type, notFoundHandler, isAll) => notFoundHandler
    ? notFoundHandler(type, isAll)
    : console.log(type === 'document' || (type === 'collection' && isAll === true)
        ? 'DATA NOT FOUND'
        : 'PARTIAL DATA NOT FOUND');
exports.notifyErrorOccurred = (error, errorHandler) => {
    const defaultErrorHandler = (error) => {
        console.error(error);
        return error;
    };
    return errorHandler ? errorHandler(error) : defaultErrorHandler(error);
};
exports.notifyCompletionIfDefined = (completionHandler) => {
    if (completionHandler) {
        completionHandler();
    }
};
