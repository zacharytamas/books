import { Account } from '../account/account';
import { EntryBuilder } from '../entry/builder';
import { Journal } from './journal';

// tslint:disable no-magic-numbers

describe('Journal', () => {
  describe('Adding/Retrieving Accounts', () => {
    let journal: Journal;

    beforeEach(() => {
      journal = new Journal();
    });

    test('Added accounts are included in `accounts` array.', () => {
      const account = new Account('Assets/Cash');
      expect(journal.accounts).toHaveLength(0);
      journal.addAccounts([account]);
      expect(journal.accounts).toHaveLength(1);
      expect(journal.accounts[0]).toBe(account);
    });

    test('Added accounts are retrievable by their name', () => {
      const ACCOUNT_NAME = 'Cash';
      const account = new Account('A-CSH', ACCOUNT_NAME);
      journal.addAccounts([account]);
      expect(journal.getAccount(account.fullyQualifiedName)).toBe(account);
    });
  });

  describe('Adding journal entries', () => {
    let journal: Journal;

    beforeEach(() => {
      journal = new Journal();
    });

    xtest('should not allow adding entries that would unbalance the books', () => {});

    xtest('should not allow negative account balances', () => {});
  });

  describe('Integration', () => {
    test('Asset Exchange Txn in Journal with two Asset accounts', () => {
      const ENTRY_MEMO = 'Purchase supplies';
      const CASH_ACCOUNT_NAME = 'Checking Account';
      const SUPPLIES_ACCOUNT_NAME = 'Supplies';
      const CASH_ACCOUNT_BEGINNING_BALANCE = 1000;
      const SUPPLIES_COST = 1000;

      const journal = new Journal();
      const cashAccount = new Account('A-CSH', CASH_ACCOUNT_NAME);
      const suppliesAccount = new Account(
        'A-INV-SUPPLIES',
        SUPPLIES_ACCOUNT_NAME
      );

      // Sanity checks
      expect(journal.entries).toHaveLength(0);
      expect(suppliesAccount.transactions).toHaveLength(0);
      expect(cashAccount.transactions).toHaveLength(0);

      journal.addAccounts([cashAccount, suppliesAccount]);

      journal.addEntry(
        EntryBuilder.start({ payee: 'N/A', memo: 'Beginning Balance' })
          .add(cashAccount, CASH_ACCOUNT_BEGINNING_BALANCE)
          .build()
      );

      journal.addEntry(
        EntryBuilder.start({ payee: 'N/A', memo: ENTRY_MEMO })
          .subtract(cashAccount, SUPPLIES_COST)
          .add(suppliesAccount, SUPPLIES_COST)
          .build()
      );

      // There should be one Journal entry now.
      expect(journal.entries).toHaveLength(2);
      // Each account should have a Transaction now since the Entry above
      // affected both accounts.
      expect(cashAccount.transactions).toHaveLength(2);
      expect(suppliesAccount.transactions).toHaveLength(1);

      // Inspect the Entry in the Journal to make sure it's what we expect.
      const [_, journalEntry] = journal.entries;
      expect(journalEntry.memo).toEqual(ENTRY_MEMO);

      expect(cashAccount.balance).toEqual(
        CASH_ACCOUNT_BEGINNING_BALANCE - SUPPLIES_COST
      );
      expect(suppliesAccount.balance).toEqual(SUPPLIES_COST);
    });
  });
});
