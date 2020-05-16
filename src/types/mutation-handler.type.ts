export type MutationHandler = (
  data: { docId: string } & Record<string, any>,
  type: firebase.firestore.DocumentChangeType,
  isLast: boolean
) => void
