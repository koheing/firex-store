import { DocumentResult } from '../models'

export type AfterMutationCalled = (data?: DocumentResult | any | void) => any
