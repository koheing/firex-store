import { Either, AppErrorOr } from '../../types'
import { AppError } from '../../models'
import {
  THIS_ID_HAS_BEEN_ALREADY_USED,
  THIS_ID_DOES_NOT_EXIST
} from '../../errors'
import { notifyErrorOccurred } from './notifications'
import { OptionsParameter } from '../../parameters'

interface TransactionParameter<T> extends OptionsParameter<T> {
  transaction: firebase.firestore.Transaction
  data: any
  ref: firebase.firestore.DocumentReference
  merge: boolean
}

const isAbleToSetOrMergeSet = (
  isMergeSet: boolean,
  snapshot: firebase.firestore.DocumentSnapshot
): boolean =>
  (isMergeSet && snapshot.exists === true) || (!isMergeSet && !snapshot.data())

export const transactionOfSetOrMergeSet = async <T = any>({
  ref,
  data,
  merge,
  transaction,
  errorHandler
}: TransactionParameter<T>): Promise<AppErrorOr<void>> => {
  const isMergeSet = merge
  const appErrorOrIsAbleToSetOrMergeSet: Either<
    AppError,
    true
  > = await transaction
    .get(ref)
    .then((snapshot) => isAbleToSetOrMergeSet(isMergeSet, snapshot))
    .then((isAbleToSet) => {
      if (isAbleToSet) {
        return true
      }

      const appError: AppError = {
        name: 'document id error',
        message: merge ? THIS_ID_DOES_NOT_EXIST : THIS_ID_HAS_BEEN_ALREADY_USED
      }
      throw appError
    })
    .catch((error: AppError) => notifyErrorOccurred(error, errorHandler))

  if (appErrorOrIsAbleToSetOrMergeSet === true) {
    transaction.set(ref, data, { merge })
    return
  }
  const appError = appErrorOrIsAbleToSetOrMergeSet
  return appError
}
