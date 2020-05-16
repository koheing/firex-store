import { Commit } from 'vuex';
import { MutationType } from '../../types';
import { Payload } from '../../models';
interface Parameter {
    mutationType: MutationType;
    changeType: firebase.firestore.DocumentChangeType;
    commit: Commit;
    payload: Payload;
}
export declare const callMutation: ({ mutationType, changeType, commit, payload, }: Parameter) => void;
export {};
