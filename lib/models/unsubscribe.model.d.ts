export interface Unsubscribe {
    readonly statePropName: string;
    unsubscribe: (state: any) => void;
}
