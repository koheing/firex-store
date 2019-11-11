import { AppError } from '../models'

export type AppErrorOr<T> = AppError | T
