import { FirestoreUnsubscriber } from '../../../src/services'
import { FIREX_UNSUBSCRIBES } from '../../../src/configurations'

describe('FirestoreFetcher', () => {
  it('unsubscribe called', () => {
    const mockUnsubscriber = jest.fn()
    const mockState: any = {}
    const mockMap = new Map<string, any>()
    mockMap.set('comments', mockUnsubscriber)
    mockState[FIREX_UNSUBSCRIBES] = mockMap
    FirestoreUnsubscriber.unbind('comments').unsubscribe(mockState)

    expect(mockUnsubscriber).toHaveBeenCalled()
    expect(mockMap.has('comments')).toBeFalsy()
  })

  it('unsubscribe called but it is undefined', () => {
    const mockState: any = {}
    const mockMap = new Map<string, any>()
    mockMap.set('user', undefined)
    mockState[FIREX_UNSUBSCRIBES] = mockMap
    FirestoreUnsubscriber.unbind('user').unsubscribe(mockState)

    expect(mockMap.size).toEqual(0)
  })

  it('unsubscribe not called', () => {
    jest.spyOn(console, 'error')
    const mockUnsubscriber = jest.fn()
    const mockState: any = {}
    const mockMap = new Map<string, any>()
    mockMap.set('comments', mockUnsubscriber)
    mockState[FIREX_UNSUBSCRIBES] = mockMap
    FirestoreUnsubscriber.unbind('user').unsubscribe(mockState)

    expect(mockUnsubscriber).not.toHaveBeenCalled()
    expect(mockMap.has('comments')).toBeTruthy()
    expect(console.error).toHaveBeenCalled()
    jest.clearAllMocks()
  })
})
