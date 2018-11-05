import { Account } from '../account/account';
import { IJournalEntry } from '../entry/entry';

export class Journal {
  public accounts: Account[] = [];
  public entries: IJournalEntry[] = [];
  private accountMap: Map<string, Account> = new Map();

  public addAccounts(accounts: Account[]) {
    accounts.forEach(a => {
      this.accountMap.set(a.fullyQualifiedName, a);
      this.accounts.push(a);
    });
  }

  public addEntry(journalEntry: IJournalEntry) {
    journalEntry.transactions.forEach(txn => {
      const { accountName, ...accountTransaction } = txn;
      const account = this.getAccount(accountName);

      if (!account) {
        throw Error(
          `Could not add entry to journal because account "${accountName}" was not found.`
        );
      }

      account.addTransaction(accountTransaction);
    });

    this.entries.push(journalEntry);
  }

  public getAccount(accountName: string): Account {
    return this.accountMap.get(accountName);
  }

  public getAccountBalance(accountName: string): number {
    // TODO This should handle when the account cannot be found. I need to
    // decide whether to throw anytime anything is wrong or return things
    // like null.
    return this.getAccount(accountName).balance;
  }
}
