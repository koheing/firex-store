import { DocumentResult } from './document-result.model'

export interface Payload<T extends DocumentResult = any> {
  data: T extends DocumentResult ? DocumentResult[] : DocumentResult
  statePropName: string
  isLast?: boolean
  [key: string]: any
}
