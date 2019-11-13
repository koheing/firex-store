import { AppError } from '../models'

export const appErrorTree = {
  ID_HAS_ALREADY_BEEN_USED: {
    name: 'Transaction Error',
    message: 'This ID has already been used.'
  } as AppError,
  DATA_EXISTED: {
    name: 'Transaction Error',
    message: 'data existed.'
  } as AppError
}
