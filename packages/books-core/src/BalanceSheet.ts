import { Books } from './Books';

export class BalanceSheet {
  constructor(private books: Books) {}

  get assetsTotal(): number {
    return this.books
      .getAccountsOfType('asset')
      .reduce((sum, current) => sum + current.balance, 0);
  }

  get claimsTotal(): number {
    return this.books
      .getAccountsOfType('claim')
      .reduce((sum, current) => sum + current.balance, 0);
  }
}
