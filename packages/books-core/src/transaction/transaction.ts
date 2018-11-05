export interface ITransaction {
  /** Amount of the transaction. */
  amount: number;
  /** Date the transaction actually occurred. */
  dateOccurred: Date;
  /** Date the transaction was recorded. */
  dateRecorded: Date;
  /** A memo providing additional context about this transaction. */
  memo?: string;
  /** The payee of this transaction. */
  payee: string;
}
