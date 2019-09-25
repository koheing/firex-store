import { MutationType } from '../../types';
interface Criteria {
    state: any;
    type: MutationType;
}
export declare const unsubscribeFirestore: ({ state, type }: Criteria) => void;
export {};
