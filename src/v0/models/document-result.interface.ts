interface Document {
  docId?: string | null
}

export interface DocumentResult extends Document {
  [key: string]: any
}
