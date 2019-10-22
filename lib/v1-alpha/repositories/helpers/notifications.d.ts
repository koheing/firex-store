import { NotFoundHandler, MutationType, ErrorHandler, CompletionHandler } from '../../types';
export declare const notifyNotFound: (type: MutationType, notFoundHandler?: NotFoundHandler | undefined, isAll?: boolean | undefined) => void;
export declare const notifyErrorOccurred: (error: any, errorHandler?: ErrorHandler | undefined) => any;
export declare const notifyCompletionIfDefined: (completionHandler?: CompletionHandler | undefined) => void;
