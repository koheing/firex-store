import { unbind } from '../../../src/factories'
import { FirestoreUnsubscriber } from '../../../src'

describe('unbind method', () => {
  it('return FirestoreUnsubscriber instance', () => {
    const unsubscriber = unbind('test')

    expect(unsubscriber).toBeInstanceOf(FirestoreUnsubscriber)
    expect(unsubscriber.statePropName).toEqual('test')
  })
})