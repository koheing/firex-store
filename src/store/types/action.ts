export const actionTypes = {
  collection: {
    SUBSCRIBE: '[firex-store] Collection Subscribe',
    UNSUBSCRIBE: '[firex-store] Collection Unsubscribe'
  },
  document: {
    SUBSCRIBE: '[firex-store] Document Subscribe',
    UNSUBSCRIBE: '[firex-store] Document Unsubscribe'
  },
  // --- deprecated, follow variables are removed ^2.0.0 ---
  DOCUMENT_SUBSCRIBE: '[firex-store] Document Subscribe',
  COLLECTION_SUBSCRIBE: '[firex-store] Collection Subscribe',
  DOCUMENT_UNSUBSCRIBE: '[firex-store] Document Unsubscribe',
  COLLECTION_UNSUBSCRIBE: '[firex-store] Collection Unsubscribe'
}
