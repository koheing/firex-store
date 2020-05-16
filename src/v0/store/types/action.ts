export const actionTypes = {
  collection: {
    SUBSCRIBE: '[firex-store] Collection Subscribe',
    UNSUBSCRIBE: '[firex-store] Collection Unsubscribe',
  },
  document: {
    SUBSCRIBE: '[firex-store] Document Subscribe',
    UNSUBSCRIBE: '[firex-store] Document Unsubscribe',
  },
  // --- deprecated, follow variables will be removed ^2.0.0 ---
  /**
   * @deprecated it will be removed ^2.0.0, so use `document.SUBSCRIBE` , please
   */
  DOCUMENT_SUBSCRIBE: '[firex-store] Document Subscribe',
  /**
   * @deprecated it will be removed ^2.0.0, so use `collection.SUBSCRIBE` , please
   */
  COLLECTION_SUBSCRIBE: '[firex-store] Collection Subscribe',
  /**
   * @deprecated it will be removed ^2.0.0, so use `document.UNSUBSCRIBE` , please
   */
  DOCUMENT_UNSUBSCRIBE: '[firex-store] Document Unsubscribe',
  /**
   * @deprecated it will be removed ^2.0.0, so use `collection.UNSUBSCRIBE` , please
   */
  COLLECTION_UNSUBSCRIBE: '[firex-store] Collection Unsubscribe',
}
