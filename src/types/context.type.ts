export interface Context<T> extends Record<string, any> {
  data: T
  isLast: boolean
  bindTo: (
    statePropName: string
  ) => (data: { docId: string } & Record<string, any>, isLast: boolean) => void
}
