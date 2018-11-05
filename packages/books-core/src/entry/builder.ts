import { Account } from '..';
import { IJournalEntry, IJournalEntryTransaction } from './entry';

interface IConstructorArgs {
  payee: string;
  memo?: string;
  dateOccurred?: Date;
}

export class EntryBuilder {
  public static start(args: IConstructorArgs) {
    return new EntryBuilder(args);
  }

  private memo: string;
  private transactions: IJournalEntryTransaction[];
  private dateOccurred: Date;
  private payee?: string;

  public constructor({
    payee,
    memo,
    dateOccurred = new Date()
  }: IConstructorArgs) {
    this.memo = memo;
    this.payee = payee;
    this.dateOccurred = dateOccurred;
  }

  public build(): IJournalEntry {
    const memo = this.memo;
    const transactions = this.transactions || [];

    return {
      dateOccurred: this.dateOccurred,
      memo: this.memo,
      transactions: this.transactions || []
    };
  }

  public subtract(account: Account, amount: number, memo?: string) {
    return this.add(account, -amount, memo);
  }

  public add(account: Account, amount: number, memo?: string) {
    this.transactions = [
      ...(this.transactions || []),
      {
        accountName: account.fullyQualifiedName,
        amount,
        dateOccurred: this.dateOccurred,
        dateRecorded: new Date(),
        memo: memo || this.memo,
        payee: this.payee
      }
    ];

    return this;
  }
}
