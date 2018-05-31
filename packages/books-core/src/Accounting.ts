interface ITransaction {
  cash: number;
  commonStock: number;
}

export class Accounting {
  public assets: number = 0;
  public cash: number = 0;
  public commonStock: number = 0;
  public equity: number = 0;
  public liabilities: number = 0;

  addTransaction(details: ITransaction) {
    const { cash, commonStock } = details;

    this.cash += cash;
    this.assets += cash;
    this.equity += commonStock;
    this.commonStock += commonStock;
  }
}
