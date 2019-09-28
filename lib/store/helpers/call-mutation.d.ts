import { Commit } from 'vuex';
import { MutationType } from '../../types';
import { Payload } from '../../models';
interface Criteria {
    mutationType: MutationType;
    changeType: firebase.firestore.DocumentChangeType;
    commit: Commit;
    payload: Payload;
}
export declare const callMutation: ({ mutationType, changeType, commit, payload }: Criteria) => void;
export {};
