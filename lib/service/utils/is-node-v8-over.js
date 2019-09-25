"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeV8Over = () => {
    const currentNodeVersion = Number(process.versions.node.split('.')[0]);
    return currentNodeVersion > 8;
};
