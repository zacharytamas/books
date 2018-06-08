import { Subject } from 'rxjs';

export type AccountType = 'asset' | 'claim';

export interface IAccountTransaction {
  amount: number;
  note: string;
}

export class Account {
  get balance() {
    return this.balanceCached === undefined
      ? (this.balanceCached = this.calculateBalance())
      : this.balanceCached;
  }
  transactions: IAccountTransaction[] = [];
  transactionStream: Subject<IAccountTransaction> = new Subject();

  private balanceCached: number = this.calculateBalance();

  constructor(
    public accountName: string,
    public type: AccountType = 'asset'
  ) {}

  addTransaction(transaction: IAccountTransaction) {
    this.transactions.push(transaction);
    this.balanceCached += transaction.amount;
    this.transactionStream.next(transaction);
  }

  private calculateBalance() {
    return this.transactions.reduce((acc, t) => acc + t.amount, 0);
  }
}
