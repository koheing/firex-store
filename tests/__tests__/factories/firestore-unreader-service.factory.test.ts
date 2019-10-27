import { on } from '../../../src/factories'
import { FirestoreUnsubscriber } from '../../../src'

describe('unbind method', () => {
  it('return FirestoreUnsubscriber instance', () => {
    const unsubscriber = on('test')

    expect(unsubscriber.unbind()).toBeInstanceOf(FirestoreUnsubscriber)
    expect(unsubscriber.unbind().statePropName).toEqual('test')
  })
})