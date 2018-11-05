import { Account } from '..';
import { EntryBuilder } from './builder';

// tslint:disable no-magic-numbers

describe('EntryBuilder', () => {
  describe('Built result', () => {
    const MEMO = 'buy supplies';
    const CASH_ACCOUNT_NAME = 'Cash';
    const SUPPLIES_ACCOUNT_NAME = 'Supplies';

    const cashAccount = new Account('A-CSH', CASH_ACCOUNT_NAME);
    const suppliesAccount = new Account(
      'A-INV-SUPPLIES',
      SUPPLIES_ACCOUNT_NAME
    );

    test('Memo is set correctly', () => {
      const built = EntryBuilder.start({ payee: '', memo: MEMO }).build();
      expect(built.memo).toEqual(MEMO);
    });

    test('Transactions are added correctly', () => {
      const built = EntryBuilder.start({ payee: 'OfficeMax', memo: MEMO })
        .subtract(cashAccount, 1000)
        .add(suppliesAccount, 1000)
        .build();

      expect(built.transactions).toHaveLength(2);

      const [subtraction, addition] = built.transactions;

      expect(subtraction.accountName).toEqual(
        cashAccount.fullyQualifiedName
      );
      expect(subtraction.amount).toEqual(-1000);
      expect(subtraction.memo).toEqual(MEMO);

      expect(addition.accountName).toEqual(
        suppliesAccount.fullyQualifiedName
      );
      expect(addition.amount).toEqual(1000);
      expect(addition.memo).toEqual(MEMO);
    });
  });
});
