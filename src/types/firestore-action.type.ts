import { Action } from 'stream-executor'
import { Context } from './context.type'

export type FirestoreAction<A, B> = Action<Context<A>, Context<B>>
