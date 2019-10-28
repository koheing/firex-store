import { on } from '../../../src/creators'
import { FirestoreUnsubscriber } from '../../../src'

describe('unbind method', () => {
  it('return FirestoreUnsubscriber instance', () => {
    const unsubscriber = on('test')

    expect(unsubscriber).toBeInstanceOf(FirestoreUnsubscriber)
    expect(unsubscriber.statePropName).toEqual('test')
  })
})
