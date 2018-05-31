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

  test('Selling common stock', () => {
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
      equity: amount
    });
  });
});
