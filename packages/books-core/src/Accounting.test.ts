import { Accounting } from './Accounting';

function expectAccountingEquationSatisfied(accounting: Accounting) {
  expect(accounting.assets).toEqual(
    accounting.liabilities + accounting.equity
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
    expect(accounting.assets).toEqual(0);
    expect(accounting.liabilities).toEqual(0);
    expect(accounting.equity).toEqual(0);
    expectAccountingEquationSatisfied(accounting);
  });

  test('Selling common stock', () => {
    const amount = 500;

    accounting.addTransaction({
      cash: amount,
      commonStock: amount
    });

    expect(accounting.cash).toEqual(amount);
    expect(accounting.assets).toEqual(amount);
    expect(accounting.equity).toEqual(amount);
    expect(accounting.commonStock).toEqual(amount);
  });
});
