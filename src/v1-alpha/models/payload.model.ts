import { DocumentResult } from './document-result.model'

export interface Payload {
  data: DocumentResult
  isLast?: boolean
  statePropName?: string
  [key: string]: any
}
