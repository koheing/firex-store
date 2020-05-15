"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMutationHandler = void 0;
const stream_executor_1 = require("stream-executor");
exports.createMutationHandler = () => {
    const forProcedure = (statePropName, callMutation, mapper, afterMutationCalled) => (data, type, isLast) => {
        const d = mapper ? mapper(data) : data;
        const payload = { data: d, isLast, statePropName };
        callMutation(statePropName)(type, payload);
        if (afterMutationCalled) {
            afterMutationCalled(payload);
        }
    };
    const forStream = (callMutation, setUnsubscriber, actions) => (data, type, isLast) => {
        const bindTo = (statePropName) => (data, isLast) => {
            setUnsubscriber(statePropName);
            callMutation(statePropName)(type, { data, isLast });
        };
        const context = { data, isLast, bindTo };
        stream_executor_1.createStream(context)
            .chain(actions[0], actions[1], actions[2], actions[3], actions[4], actions[5], actions[6], actions[7], actions[8], actions[9])
            .execute();
    };
    return { forProcedure, forStream };
};
