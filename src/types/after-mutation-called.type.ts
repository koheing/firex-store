import { Payload } from '../models'

/**
 * @description Payload = {
 *   data?: {
 *     docId: string | null,
 *     [key: string]: any
 *   },
 *   isLast?: boolean,
 *   [key: string]: any
 * }
 */
export type AfterMutationCalled = (payload?: Payload) => void
