import { firestore } from 'firebase';
export declare type CallMutation = (changeType: firestore.DocumentChangeType, payload: any) => void;
