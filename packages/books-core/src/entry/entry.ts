import { ITransaction } from '../transaction/transaction';

export class Entry {
  public memo: string;
  public transactions: ITransaction[];

  public constructor({ memo, transactions }) {
    this.memo = memo;
    this.transactions = transactions;
  }
}
