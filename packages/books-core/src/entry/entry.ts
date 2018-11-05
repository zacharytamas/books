import { ITransaction } from '..';

export interface IJournalEntryTransaction extends ITransaction {
  accountName: string;
}

export interface IJournalEntry {
  dateOccurred: Date;
  memo: string;
  transactions: IJournalEntryTransaction[];
}
