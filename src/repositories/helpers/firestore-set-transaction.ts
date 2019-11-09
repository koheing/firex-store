import { Either } from '../../types'
import { AppError } from '../../models'
import { THIS_ID_HAS_BEEN_ALREADY_USED } from '../../errors'
import { notifyErrorOccurred } from './notifications'
import { CriteriaOptions } from '../../options'

interface TransactionCriteria<T> extends CriteriaOptions<T> {
  transaction: firebase.firestore.Transaction
  data: any
  ref: firebase.firestore.DocumentReference
  merge: boolean
}

export const transactionOfSet = async <T = any>({
  ref,
  data,
  merge,
  transaction,
  errorHandler
}: TransactionCriteria<T>) => {
  const appErrorOrIsNotExist: Either<AppError, true> = await transaction
    .get(ref)
    .then((snapshot) => {
      if (!snapshot.exists) {
        return true
      }
      const appError = {
        message: THIS_ID_HAS_BEEN_ALREADY_USED
      } as AppError
      throw appError
    })
    .catch((error: AppError) => notifyErrorOccurred(error, errorHandler))

  if (appErrorOrIsNotExist === true) {
    transaction.set(ref, data, { merge })
    return
  }
  const appError = appErrorOrIsNotExist
  return appError
}
