import { DocumentResult } from './document-result.interface';
export interface Payload {
    data: DocumentResult;
    isLast?: boolean;
    [key: string]: any;
}
