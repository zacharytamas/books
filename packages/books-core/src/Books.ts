import { Account, IAccountTransaction, AccountType } from './Account';
import { Subject } from 'rxjs';

interface IAccountTransactionGeneric extends IAccountTransaction {
  account: Account;
}

export class Books {
  private accounts: Account[] = [];
  private accountsMap: Map<string, Account> = new Map();

  addAccount(account: Account) {
    this.accounts.push(account);
    this.accountsMap.set(account.accountName, account);
  }

  getAccountByName(accountName: string) {
    return this.accountsMap.get(accountName);
  }

  getAccountsOfType(accountType: AccountType): Account[] {
    return this.accounts.filter(a => a.type === accountType);
  }

  addTransactions(transactions: IAccountTransactionGeneric[]) {
    let assetsValue = 0;
    let claimsValue = 0;

    // TODO It would be better to accept multiple lists of transactions
    // grouped by their account so that the passed in parameters are
    // themselves valid `IAccountTransaction`s.

    transactions.forEach(txn => {
      if (txn.account.type === 'claim') {
        claimsValue += txn.amount;
      } else if (txn.account.type === 'asset') {
        assetsValue += txn.amount;
      }
    });

    if (assetsValue !== claimsValue) {
      throw new Error('List of transactions unbalances the books.');
    }

    // If the books would remain balanced, add the transactions to the
    // accounts.
    transactions.forEach(txn =>
      txn.account.addTransaction({ amount: txn.amount, note: txn.note })
    );
  }
}
