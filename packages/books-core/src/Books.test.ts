// tslint:disable:no-unused-expression

import { Books } from './Books';
import { Account } from './Account';

describe('Books', () => {
  let books: Books;

  beforeEach(() => {
    books = new Books();
  });

  describe('addAccount()', () => {
    test('adding Accounts', () => {
      const cashAccount = new Account('Cash');
      // Expect that we can add an Account without error.
      expect(() => books.addAccount(cashAccount)).not.toThrow();
    });

    test('getting accounts by name', () => {
      const ACCOUNT_NAME = 'Cash';
      const cashAccount = new Account(ACCOUNT_NAME);

      // Getting the Account by its name from Books should be undefined
      // right now because we have not actually added it yet.
      expect(books.getAccountByName(ACCOUNT_NAME)).toBeUndefined;

      // Add `cashAccount` to `books` and expect that it can be fetched by
      // its name.
      books.addAccount(cashAccount);
      expect(books.getAccountByName(ACCOUNT_NAME)).toBe(cashAccount);
    });
  });

  describe('adding transactions', () => {
    const INITIAL_DEPOSIT = 5000;
    let cashAccount: Account;
    let commonStock: Account;

    beforeEach(() => {
      cashAccount = new Account('Cash', 'asset');
      commonStock = new Account('Common Stock', 'claim');

      books.addAccount(cashAccount);
      books.addAccount(commonStock);
    });

    test('adding a valid batch of transactions', () => {
      expect(() =>
        books.addTransactions([
          {
            account: cashAccount,
            amount: INITIAL_DEPOSIT,
            note: 'Investment from founder'
          },
          {
            account: commonStock,
            amount: INITIAL_DEPOSIT,
            note: 'Issued common stock to founder'
          }
        ])
      ).not.toThrow();

      // The transactions should have been added to their respective accounts.
      expect(cashAccount.transactions).toHaveLength(1);
      expect(commonStock.transactions).toHaveLength(1);
    });

    test('adding a batch of transactions that would unbalance the books', () => {
      expect(() =>
        books.addTransactions([
          {
            account: cashAccount,
            amount: INITIAL_DEPOSIT,
            note: 'Investment from founder'
          },
          {
            account: commonStock,
            // This value can be anything but `INITIAL_DEPOSIT` for the
            // purposes of this test
            amount: INITIAL_DEPOSIT / 2,
            note: 'Issued common stock to founder'
          }
        ])
      ).toThrowError('List of transactions unbalances the books.');
    });
  });
});
