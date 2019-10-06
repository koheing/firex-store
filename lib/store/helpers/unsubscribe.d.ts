import { MutationType } from '../../types';
interface Criteria {
    state: any;
    type: MutationType;
}
/**
 * @description unsubscribe firestore data
 * @param type 'document' | 'collection'
 * @param state any. vuex's state
 */
export declare const unsubscribeFirestore: ({ state, type }: Criteria) => void;
export {};
