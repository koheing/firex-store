import { firestore } from 'firebase'

export type CallMutation = (
  changeType: firestore.DocumentChangeType,
  payload: any
) => void
