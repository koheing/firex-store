export interface Context<T> extends Record<string, any> {
  data: T
  isLast: boolean
  bindTo: (
    statePropName: string
  ) => (data: Record<string, any>, isLast: boolean) => void
}
