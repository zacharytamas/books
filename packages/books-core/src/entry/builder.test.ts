import { EntryBuilder } from './builder';

// tslint:disable no-magic-numbers

describe('EntryBuilder', () => {
  describe('Built result', () => {
    test('Memo is set correctly', () => {
      const MEMO = 'buy supplies';
      const built = EntryBuilder.start(MEMO).build();
      expect(built.memo).toEqual(MEMO);
    });

    test('Transactions are added correctly', () => {
      const built = EntryBuilder.start('buy supplies')
        .subtract('Assets/Cash', 1000)
        .add('Assets/Supplies', 1000)
        .build();

      expect(built.transactions).toHaveLength(2);
    });
  });
});
