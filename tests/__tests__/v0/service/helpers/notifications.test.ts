import {
  notifyNotFound,
  notifyCompletionIfDefined,
  notifyErrorOccurred
} from '../../../../../src/v0/service/helpers/notifications'

describe('notifyErrorHandler', () => {
  it('call errorHandler', () => {
    const errorHandler = jest.fn((error) => console.log(error))
    const notify = () =>
      notifyErrorOccurred('Sample Message: Error!', errorHandler)
    notify()
    expect(errorHandler).toHaveBeenCalled()
  })

  it('not error if errorHandler not defined', () => {
    jest.spyOn(console, 'error')
    const error = 'Sample Message: Error!'
    const notify = () => notifyErrorOccurred(error)
    notify()
    expect(console.error).toHaveBeenCalled()
    jest.clearAllMocks()
  })
})

describe('notifyCompletionIfDefined', () => {
  it('call completionHandler', () => {
    const completionHandler = jest.fn()
    const notify = () => notifyCompletionIfDefined(completionHandler)
    notify()
    expect(completionHandler).toHaveBeenCalled()
  })
})

describe('notifyNotFound', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('call notifyNotFound', async () => {
    const notFoundHandler = jest.fn()
    const notify = () => notifyNotFound('document', notFoundHandler)
    notify()
    expect(notFoundHandler).toHaveBeenCalled()
  })

  it('call notifyNotFound: document type, output default log', () => {
    const spyLog = jest.spyOn(console, 'log')
    spyLog.mockImplementation((x) => x)
    const notify = () => notifyNotFound('document')
    notify()
    expect(console.log).toHaveBeenCalled()
    expect(spyLog.mock.calls[0][0]).toBe('DATA NOT FOUND')
  })

  it('call notifyNotFound: collection type and isAll is true, output default log', () => {
    const spyLog = jest.spyOn(console, 'log')
    spyLog.mockImplementation((x) => x)
    const notify = () => notifyNotFound('collection', undefined, true)
    notify()
    expect(console.log).toHaveBeenCalled()
    expect(spyLog.mock.calls[0][0]).toBe('DATA NOT FOUND')
  })

  it('call notifyNotFound: collection type and isAll is false, output default log', () => {
    const spyLog = jest.spyOn(console, 'log')
    spyLog.mockImplementation((x) => x)
    const notify = () => notifyNotFound('collection', undefined, false)
    notify()
    expect(console.log).toHaveBeenCalled()
    expect(spyLog.mock.calls[0][0]).toBe('PARTIAL DATA NOT FOUND')
  })
})
