import { Account } from './Account';

const TEST_ACCOUNT_NAME = 'My Account';

describe('Account', () => {
  let account: Account;

  beforeEach(() => {
    account = new Account(TEST_ACCOUNT_NAME);
  });

  test('can be instantiated with name', () => {
    expect(account.accountName).toEqual(TEST_ACCOUNT_NAME);
  });

  test('balance updates when adding transactions', () => {
    const TRANSACTION_1 = { amount: 500 };
    const TRANSACTION_2 = { amount: -250 };

    // For sanity, check that the account has a balance of zero.
    expect(account.balance).toEqual(0);

    account.addTransaction(TRANSACTION_1);
    expect(account.balance).toEqual(0 + TRANSACTION_1.amount);

    account.addTransaction(TRANSACTION_2);
    expect(account.balance).toEqual(
      0 + TRANSACTION_1.amount + TRANSACTION_2.amount
    );
  });
});
