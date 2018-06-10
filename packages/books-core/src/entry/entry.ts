export interface IJournalEntryTransaction {
  accountName: string;
  amount: number;
  dateOccurred: Date;
  memo: string;
}

export interface IJournalEntry {
  dateOccurred: Date;
  memo: string;
  transactions: IJournalEntryTransaction[];
}
