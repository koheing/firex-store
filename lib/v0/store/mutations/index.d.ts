import { MutationTree } from 'vuex';
import { MutationType } from '../../types';
interface Criteria {
    statePropName: string;
    type: MutationType;
}
export declare const firestoreMutations: ({ statePropName, type, }: Criteria) => MutationTree<any>;
export {};
