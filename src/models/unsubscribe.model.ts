export interface Unsubscribe {
  readonly type: 'document' | 'collection'
  unsubscribe: (state: any) => void
}
