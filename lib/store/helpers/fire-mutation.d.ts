import { Commit } from 'vuex';
import { MutationType } from '../../types';
interface Criteria {
    mutationType: MutationType;
    changeType: firebase.firestore.DocumentChangeType;
    commit: Commit;
    payload: any;
}
export declare const fireMutation: ({ mutationType, changeType, commit, payload }: Criteria) => void;
export {};
