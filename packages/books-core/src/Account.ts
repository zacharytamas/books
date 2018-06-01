interface ITransaction {
  amount: number;
}

export class Account {
  get balance() {
    return this.balanceCached === undefined
      ? (this.balanceCached = this.calculateBalance())
      : this.balanceCached;
  }
  transactions: ITransaction[] = [];

  private balanceCached: number;

  constructor(public accountName: string) {}

  addTransaction(transaction: ITransaction) {
    this.transactions.push(transaction);
    this.balanceCached += transaction.amount;
  }

  private calculateBalance() {
    return this.transactions.reduce((acc, t) => acc + t.amount, 0);
  }
}
