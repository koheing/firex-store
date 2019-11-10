import { Either, AppErrorOr } from '../../types'
import { AppError } from '../../models'
import { THIS_ID_HAS_BEEN_ALREADY_USED, THIS_ID_DOES_NOT_EXIST } from '../../errors'
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
}: TransactionCriteria<T>): Promise<AppErrorOr<void>> => {
  const isMergeSetAction = merge
  const appErrorOrIsNotExist: Either<AppError, true> = await transaction
    .get(ref)
    .then((snapshot) => (isMergeSetAction && snapshot.exists === true || !isMergeSetAction && !snapshot.data()) ? true : false)
    .then(isAbleToSet => {
      if (isAbleToSet) {
        return true
      }

      const appError: AppError = {
        name: 'document id error',
        message: isMergeSetAction ? THIS_ID_DOES_NOT_EXIST : THIS_ID_HAS_BEEN_ALREADY_USED
      }
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
