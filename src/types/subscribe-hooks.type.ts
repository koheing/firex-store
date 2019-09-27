import { Payload } from '../models'

export type AfterMutationCalled = (data?: Payload | any | void) => any
