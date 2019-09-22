import { firestore } from 'firebase'

export type FireMutation = (
  changeType: firestore.DocumentChangeType,
  payload: any
) => void
