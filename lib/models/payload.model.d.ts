import { DocumentResult } from './document-result.model';
export interface Payload {
    data: DocumentResult;
    statePropName: string;
    isLast?: boolean;
    [key: string]: any;
}
