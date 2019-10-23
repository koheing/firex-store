export declare const actionTypes: {
    collection: {
        SUBSCRIBE: string;
        UNSUBSCRIBE: string;
    };
    document: {
        SUBSCRIBE: string;
        UNSUBSCRIBE: string;
    };
    /**
     * @deprecated it will be removed ^2.0.0, so use `document.SUBSCRIBE` , please
     */
    DOCUMENT_SUBSCRIBE: string;
    /**
     * @deprecated it will be removed ^2.0.0, so use `collection.SUBSCRIBE` , please
     */
    COLLECTION_SUBSCRIBE: string;
    /**
     * @deprecated it will be removed ^2.0.0, so use `document.UNSUBSCRIBE` , please
     */
    DOCUMENT_UNSUBSCRIBE: string;
    /**
     * @deprecated it will be removed ^2.0.0, so use `collection.UNSUBSCRIBE` , please
     */
    COLLECTION_UNSUBSCRIBE: string;
};
