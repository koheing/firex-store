import { Mapper, CallMutation, AfterMutationCalled, MutationHandler } from '../../types';
import { Action } from 'stream-executor';
export declare const createMutationHandler: () => {
    forProcedure: <T = any>(statePropName: string, callMutation: (statePropName: string) => CallMutation, mapper?: Mapper<T> | undefined, afterMutationCalled?: AfterMutationCalled | undefined) => MutationHandler;
    forStream: (callMutation: (statePropName: string) => CallMutation, setUnsubscriber: (statePropName: string) => void, actions: Action<any, any>[]) => MutationHandler;
};
