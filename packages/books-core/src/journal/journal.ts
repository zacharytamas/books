import { Account } from '../account/account';
import { Entry } from '../entry/entry';

export class Journal {
  public accounts: Account[] = [];
  public entries: Entry[] = [];
  private accountMap: Map<string, Account> = new Map();

  public addAccounts(accounts: Account[]) {
    accounts.forEach(a => {
      this.accountMap.set(a.name, a);
      this.accounts.push(a);
    });
  }

  public addEntry(entry: Entry) {
    this.entries.push(entry);
  }

  public getAccount(accountName: string): Account {
    return this.accountMap.get(accountName);
  }
}
