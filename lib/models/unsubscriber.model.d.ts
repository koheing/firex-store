export interface Unsubscriber {
    readonly statePropName: string;
    unsubscribe: (state: any) => void;
}
