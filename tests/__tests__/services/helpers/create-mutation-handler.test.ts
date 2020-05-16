import { createMutationHandler } from '../../../../src/services/helpers/create-mutation-handler'
import { Context } from '../../../../src/types'

describe('createMutationHandler', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('forProcedure succeeded', () => {
    const mockAfterMutationCalled = jest.fn()
    const mockCallMutation = jest.fn()
    const mutationHandler = createMutationHandler().forProcedure(
      '',
      (statePropName: string) => mockCallMutation,
      jest.fn((data) => data),
      mockAfterMutationCalled
    )

    mutationHandler({ docId: 'chara0001', name: 'sans' }, 'added', true)

    expect(mockCallMutation).toHaveBeenCalled()
    expect(mockAfterMutationCalled).toHaveBeenCalled()
  })

  it('forProcedure succeeded', () => {
    const mockCallMutation = jest.fn()
    const mutationHandler = createMutationHandler().forProcedure(
      '',
      (statePropName: string) => mockCallMutation
    )

    mutationHandler({ docId: 'chara0001', name: 'sans' }, 'added', true)

    expect(mockCallMutation).toHaveBeenCalled()
  })

  it('forStream succeeded', () => {
    const mockCallMutation = jest.fn()
    const mutationHandler = createMutationHandler().forStream(
      (statePropName: string) => mockCallMutation,
      jest.fn(),
      [(it: Context<any>) => it.bindTo('charactor')(it.data, it.isLast)]
    )

    mutationHandler({ docId: 'chara0001', name: 'sans' }, 'added', true)

    expect(mockCallMutation).toHaveBeenCalled()
  })
})
