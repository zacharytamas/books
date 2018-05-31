import { Accounting, AssetAccounts, EquityAccounts } from './Accounting';

function expectAccountingEquationSatisfied(accounting: Accounting) {
  expect(accounting.assets).toEqual(
    accounting.liabilities + accounting.equity
  );
}

function expectKeyValues(accounting: Accounting, obj: {}) {
  Object.keys(obj).forEach(key =>
    expect(accounting[key]).toEqual(obj[key])
  );
}

describe('Accounting class', () => {
  let accounting: Accounting;

  beforeEach(() => {
    accounting = new Accounting();
  });

  afterEach(() => {
    // Above all the Accounting Equation should always be satisfied.
    expectAccountingEquationSatisfied(accounting);
  });

  test('Initial values', () => {
    expectKeyValues(accounting, {
      assets: 0,
      cash: 0,
      commonStock: 0,
      equity: 0,
      liabilities: 0
    });
  });

  describe('Selling common stock', () => {
    it('should increase cash and common stock values', () => {
      const amount = 500;

      accounting.addTransaction({
        amount,
        assetAccount: AssetAccounts.cash,
        equityAccount: EquityAccounts.commonStock
      });

      expectKeyValues(accounting, {
        assets: amount,
        cash: amount,
        commonStock: amount,
        equity: amount,
        liabilities: 0 // To confirm this value did not change.
      });
    });
  });
});
