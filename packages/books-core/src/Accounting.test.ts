import { Accounting } from './Accounting';

describe('Accounting class', () => {
  describe('Accounting Equation', () => {
    test('Assets = Liabilities + Equity', () => {
      const accounting = new Accounting();

      expect(accounting.assets).toEqual(
        accounting.liabilities + accounting.equity
      );
    });
  });
});
