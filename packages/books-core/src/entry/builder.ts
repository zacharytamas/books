import { ITransaction } from '../transaction/transaction';
import { Entry } from './entry';

export class EntryBuilder {
  public static start(memo: string) {
    return new EntryBuilder({ memo });
  }

  private memo: string;
  private transactions: ITransaction[];

  public constructor({ memo }) {
    this.memo = memo;
  }

  public build() {
    const memo = this.memo;
    const transactions = this.transactions || [];

    return new Entry({ memo, transactions });
  }

  public subtract(accountName: string, amount: number) {
    return this;
  }

  public add(accountName: string, amount: number) {
    return this;
  }
}
