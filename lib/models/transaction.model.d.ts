export interface Transaction {
    readonly isTransaction: boolean;
    transaction: () => this;
}
