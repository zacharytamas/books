import { IJournalEntry, IJournalEntryTransaction } from './entry';

export class EntryBuilder {
  public static start(memo: string, dateOccurred?: Date) {
    return new EntryBuilder({ memo, dateOccurred });
  }

  private memo: string;
  private transactions: IJournalEntryTransaction[];
  private dateOccurred: Date;

  public constructor({ memo, dateOccurred = new Date() }) {
    this.memo = memo;
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

  public subtract(accountName: string, amount: number, memo?: string) {
    return this.add(accountName, -amount, memo);
  }

  public add(accountName: string, amount: number, memo?: string) {
    this.transactions = [
      ...(this.transactions || []),
      {
        accountName,
        amount,
        dateOccurred: this.dateOccurred,
        memo: memo || this.memo
      }
    ];

    return this;
  }
}
