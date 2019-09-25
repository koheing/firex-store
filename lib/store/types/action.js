"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionTypes = {
    collection: {
        SUBSCRIBE: '[firex-store] Collection Subscribe',
        UNSUBSCRIBE: '[firex-store] Collection Unsubscribe'
    },
    document: {
        SUBSCRIBE: '[firex-store] Document Subscribe',
        UNSUBSCRIBE: '[firex-store] Document Unsubscribe'
    },
    // --- deprecated, follow variables are removed ^2.0.0 ---
    /**
     * @deprecated follow variables are removed ^2.0.0
     */
    DOCUMENT_SUBSCRIBE: '[firex-store] Document Subscribe',
    /**
     * @deprecated follow variables are removed ^2.0.0
     */
    COLLECTION_SUBSCRIBE: '[firex-store] Collection Subscribe',
    /**
     * @deprecated follow variables are removed ^2.0.0
     */
    DOCUMENT_UNSUBSCRIBE: '[firex-store] Document Unsubscribe',
    /**
     * @deprecated follow variables are removed ^2.0.0
     */
    COLLECTION_UNSUBSCRIBE: '[firex-store] Collection Unsubscribe'
};
