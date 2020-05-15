"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.v0 = void 0;
__exportStar(require("./store"), exports);
var services_1 = require("./services");
Object.defineProperty(exports, "FirestoreFinder", { enumerable: true, get: function () { return services_1.FirestoreFinder; } });
Object.defineProperty(exports, "FirestoreSubscriber", { enumerable: true, get: function () { return services_1.FirestoreSubscriber; } });
Object.defineProperty(exports, "FirestoreUnsubscriber", { enumerable: true, get: function () { return services_1.FirestoreUnsubscriber; } });
Object.defineProperty(exports, "FirestoreAdder", { enumerable: true, get: function () { return services_1.FirestoreAdder; } });
Object.defineProperty(exports, "FirestoreMergeSetter", { enumerable: true, get: function () { return services_1.FirestoreMergeSetter; } });
Object.defineProperty(exports, "FirestoreSetter", { enumerable: true, get: function () { return services_1.FirestoreSetter; } });
Object.defineProperty(exports, "FirestoreDeleter", { enumerable: true, get: function () { return services_1.FirestoreDeleter; } });
Object.defineProperty(exports, "map", { enumerable: true, get: function () { return services_1.map; } });
Object.defineProperty(exports, "bindTo", { enumerable: true, get: function () { return services_1.bindTo; } });
var models_1 = require("./models");
Object.defineProperty(exports, "FirestoreMapper", { enumerable: true, get: function () { return models_1.FirestoreMapper; } });
var creators_1 = require("./creators");
Object.defineProperty(exports, "from", { enumerable: true, get: function () { return creators_1.from; } });
Object.defineProperty(exports, "on", { enumerable: true, get: function () { return creators_1.on; } });
Object.defineProperty(exports, "to", { enumerable: true, get: function () { return creators_1.to; } });
const v0 = require("./v0");
exports.v0 = v0;
