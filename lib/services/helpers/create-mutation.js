"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMutation = void 0;
const call_mutation_1 = require("./call-mutation");
exports.createMutation = ({ mutationType, commit }) => (statePropName) => (changeType, { isLast, data }) => call_mutation_1.callMutation({
    mutationType,
    changeType,
    commit,
    payload: { statePropName, isLast, data },
});
