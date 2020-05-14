import {
  Mapper,
  CallMutation,
  AfterMutationCalled,
  Context,
  MutationHandler,
} from '../../types'
import { createStream, Action } from 'stream-executor'

export const createMutationHandler = () => {
  const forProcedure = <T = any>(
    statePropName: string,
    callMutation: (statePropName: string) => CallMutation,
    mapper?: Mapper<T>,
    afterMutationCalled?: AfterMutationCalled
  ): MutationHandler => (
    data: { docId: string } & Record<string, any>,
    type: firebase.firestore.DocumentChangeType,
    isLast: boolean
  ) => {
    const d = mapper ? mapper(data) : data
    const payload = { data: d, isLast, statePropName }

    callMutation(statePropName)(type, payload)

    if (afterMutationCalled) {
      afterMutationCalled(payload)
    }
  }

  const forStream = (
    callMutation: (statePropName: string) => CallMutation,
    setUnsubscriber: (statePropName: string) => void,
    actions: Action<any, any>[]
  ): MutationHandler => (
    data: { docId: string } & Record<string, any>,
    type: firebase.firestore.DocumentChangeType,
    isLast: boolean
  ) => {
    const bindTo = (statePropName: string) => (
      data: { docId: string } & Record<string, any>,
      isLast: boolean
    ) => {
      setUnsubscriber(statePropName)
      callMutation(statePropName)(type, { data, isLast })
    }
    const context: Context<any> = { data, isLast, bindTo }

    createStream(context)
      .chain(
        actions[0],
        actions[1],
        actions[2],
        actions[3],
        actions[4],
        actions[5],
        actions[6],
        actions[7],
        actions[8],
        actions[9]
      )
      .execute()
  }

  return { forProcedure, forStream }
}
