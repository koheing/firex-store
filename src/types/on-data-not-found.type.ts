import { MutationType } from './mutation-type.type'

/**
 * @description type: 'document' | 'collection'.
 * isAll: It's undefined in case of 'document' type. it is true if QuerySnaphsot.empty is empty.
 */
export type OnDataNotFound = (type?: MutationType, isAll?: boolean) => void
