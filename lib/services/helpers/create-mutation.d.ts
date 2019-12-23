import { CallMutation, MutationType } from '../../types';
import { Commit } from 'vuex';
interface MutationParameter {
    mutationType: MutationType;
    commit: Commit;
}
export declare const createMutation: ({ mutationType, commit }: MutationParameter) => CallMutation;
export {};
