import { firestore } from 'firebase';
export declare type FireMutation = (changeType: firestore.DocumentChangeType, payload: any) => void;
