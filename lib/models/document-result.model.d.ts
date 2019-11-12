import { DocumentId } from '../types';
interface Document {
    docId?: DocumentId | null;
}
export interface DocumentResult extends Document {
    [key: string]: any;
}
export {};
