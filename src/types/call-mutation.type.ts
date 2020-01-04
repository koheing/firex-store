import { firestore } from 'firebase'
import { Payload } from '../models'

export type CallMutation = (
  changeType: firestore.DocumentChangeType,
  payload: Payload
) => void
