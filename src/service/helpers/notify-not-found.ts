import { NotFoundHandler, MutationType } from '../../types'

export const notifyNotFound = (
  type: MutationType,
  notFoundHandler?: NotFoundHandler,
  isAll?: boolean
) =>
  notFoundHandler ? notFoundHandler(type, isAll) : console.log('DATA NOT FOUND')
