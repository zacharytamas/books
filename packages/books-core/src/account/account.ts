import { ITransaction } from '../transaction/transaction';

/**
 * An Account.
 */
export class Account {
  public kind: string;
  public name: string;
  public transactions: ITransaction[] = [];

  public get fullyQualifiedName() {
    return `${this.kind} ${this.name}`;
  }

  // tslint:disable-next-line:variable-name
  private _balance: number = 0;

  public constructor(kind: string, name: string) {
    this.kind = kind;
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
