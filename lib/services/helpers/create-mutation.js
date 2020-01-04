"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const call_mutation_1 = require("./call-mutation");
exports.createMutation = ({ mutationType, commit }) => (changeType, payload) => call_mutation_1.callMutation({ mutationType, changeType, commit, payload });
