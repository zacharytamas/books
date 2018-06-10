import { EntryBuilder } from './builder';

// tslint:disable no-magic-numbers

describe('EntryBuilder', () => {
  describe('Built result', () => {
    const MEMO = 'buy supplies';
    const CASH_ACCOUNT_NAME = 'Assets/Cash';
    const SUPPLIES_ACCOUNT_NAME = 'Assets/Supplies';

    test('Memo is set correctly', () => {
      const built = EntryBuilder.start(MEMO).build();
      expect(built.memo).toEqual(MEMO);
    });

    test('Transactions are added correctly', () => {
      const built = EntryBuilder.start(MEMO)
        .subtract(CASH_ACCOUNT_NAME, 1000)
        .add(SUPPLIES_ACCOUNT_NAME, 1000)
        .build();

      expect(built.transactions).toHaveLength(2);

      const [subtraction, addition] = built.transactions;

      expect(subtraction.accountName).toEqual(CASH_ACCOUNT_NAME);
      expect(subtraction.amount).toEqual(-1000);
      expect(subtraction.memo).toEqual(MEMO);

      expect(addition.accountName).toEqual(SUPPLIES_ACCOUNT_NAME);
      expect(addition.amount).toEqual(1000);
      expect(addition.memo).toEqual(MEMO);
    });
  });
});
