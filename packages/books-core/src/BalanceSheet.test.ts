import { BalanceSheet } from './BalanceSheet';
import { Books } from './Books';
import { Account } from './Account';

describe('BalanceSheet', () => {
  let books: Books;
  let balanceSheet: BalanceSheet;

  beforeEach(() => {
    books = new Books();
    balanceSheet = new BalanceSheet(books);
  });

  afterEach(() => {
    // The Assets and Claims balances should *always* be equal. This is
    // fundamentally the Accounting Equation.
    expect(balanceSheet.assetsTotal).toEqual(balanceSheet.claimsTotal);
  });

  describe('high-level account balance tracking', () => {
    test('assets and claims balance updates when transactions posted', () => {
      const INITIAL_DEPOSIT = 5000;

      // These totals should be equal to 0 at first by default.
      expect(balanceSheet.assetsTotal).toEqual(0);
      expect(balanceSheet.claimsTotal).toEqual(0);

      // Create an Asset account and a Claim account.
      const cashAccount = new Account('Cash', 'asset');
      const commonStock = new Account('Common Stock', 'claim');

      books.addAccount(cashAccount);
      books.addAccount(commonStock);

      // Sanity: they should remain 0 because
      expect(balanceSheet.assetsTotal).toEqual(0);
      expect(balanceSheet.claimsTotal).toEqual(0);

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
      ]);

      expect(balanceSheet.assetsTotal).toEqual(INITIAL_DEPOSIT);
      expect(balanceSheet.claimsTotal).toEqual(INITIAL_DEPOSIT);
    });
  });
});
