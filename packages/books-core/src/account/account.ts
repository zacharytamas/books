import { ITransaction } from '../transaction/transaction';

/**
 * An Account.
 */
export class Account {
  public name: string;
  public transactions: ITransaction[] = [];

  // tslint:disable-next-line:variable-name
  private _balance: number = 0;

  public constructor(name: string) {
    this.name = name;
  }

  addTransaction(txn: ITransaction) {
    this.transactions.push(txn);
    this._balance += txn.amount;
  }

  get balance(): number {
    return this._balance;
  }
}
