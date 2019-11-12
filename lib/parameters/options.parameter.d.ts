import { Mapper, ErrorHandler, CompletionHandler } from '../types';
export interface OptionsParameter<T> {
    /**
     * @param mapper convert subscribed data to something, if defined
     *   - type: <T>(data: { [key: string]: any }) => T
     */
    mapper?: Mapper<T>;
    /**
     * @param errorHandler it is called when error occured, if defined. But if not, call `console.error(error)`
     *   - type: (error: any) => any
     */
    errorHandler?: ErrorHandler;
    /**
     * @param completionHandler it is called when completed fetching data , if defined.
     *   - type: () => void
     */
    completionHandler?: CompletionHandler;
}
