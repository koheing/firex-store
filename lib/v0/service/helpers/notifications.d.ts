import { NotFoundHandler, ErrorHandler, CompletionHandler } from '../../types';
export declare const notifyNotFound: (type: "document" | "collection", notFoundHandler?: NotFoundHandler | undefined, isAll?: boolean | undefined) => void;
export declare const notifyErrorOccurred: (error: any, errorHandler?: ErrorHandler | undefined) => any;
export declare const notifyCompletionIfDefined: (completionHandler?: CompletionHandler | undefined) => void;
