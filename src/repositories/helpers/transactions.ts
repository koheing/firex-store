import { AppErrorOr, ErrorHandler } from '../../types'
import { AppError } from '../../models'
import { appErrorTree } from '../../errors'
import { notifyErrorOccurred } from './notifications'
import { OptionsParameter } from '../../parameters'

interface SetTransactionParameter<T> extends OptionsParameter<T> {
  transaction: firebase.firestore.Transaction
  data: any
  ref: firebase.firestore.DocumentReference
  merge: boolean
}

interface DeleteTransactionParameter {
  transaction: firebase.firestore.Transaction
  ref: firebase.firestore.DocumentReference
  errorHandler?: ErrorHandler
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
  errorHandler,
}: SetTransactionParameter<T>): Promise<AppErrorOr<void>> => {
  const isMergeSet = merge
  const appErrorOrIsAbleToSetOrMergeSet = await transaction
    .get(ref)
    .then((snapshot) => isAbleToSetOrMergeSet(isMergeSet, snapshot))
    .then((isAbleToSet) => {
      if (isAbleToSet) {
        return true
      }

      const appError = merge
        ? appErrorTree.DATA_EXISTED
        : appErrorTree.ID_HAS_ALREADY_BEEN_USED
      throw appError
    })
    .catch((error: AppError) => notifyErrorOccurred(error, errorHandler))

  if (
    typeof appErrorOrIsAbleToSetOrMergeSet === 'boolean' &&
    appErrorOrIsAbleToSetOrMergeSet === true
  ) {
    transaction.set(ref, data, { merge })
    return
  }
  const appError = appErrorOrIsAbleToSetOrMergeSet
  return appError
}

export const transacitonOfDelete = async ({
  ref,
  transaction,
  errorHandler,
}: DeleteTransactionParameter): Promise<AppErrorOr<void>> => {
  const appErrorOrIsExisted = await transaction
    .get(ref)
    .then((snapshot) => snapshot.exists)
    .then((isExisted) => {
      if (isExisted) {
        return true
      }

      throw appErrorTree.DATA_NOT_EXISTED
    })
    .catch((error: AppError) => notifyErrorOccurred(error, errorHandler))

  if (
    typeof appErrorOrIsExisted === 'boolean' &&
    appErrorOrIsExisted === true
  ) {
    transaction.delete(ref)
    return
  }
  const appError = appErrorOrIsExisted
  return appError
}
