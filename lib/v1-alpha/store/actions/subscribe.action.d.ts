import { ActionTree } from 'vuex';
import { SubscribeCriteriaOptions } from '../../options';
import { FirestoreSubscriber } from '../../services/firestore-subscriber.service';
interface CriteriaOptions<T> extends SubscribeCriteriaOptions<T> {
    actionName?: string;
}
export declare const firestoreSubscribeAction: (subscriber: FirestoreSubscriber, options?: CriteriaOptions<any> | undefined) => ActionTree<any, any>;
export {};
