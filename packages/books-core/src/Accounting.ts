interface ITransaction {
  cash: number;
  commonStock: number;
}

export class Accounting {
  public get assets() {
    const { assets } = this.valueCache;
    return assets || (this.valueCache.assets = this.cash);
  }

  public get equity() {
    const { equity } = this.valueCache;
    return equity || (this.valueCache.equity = this.commonStock);
  }

  public cash: number = 0;
  public commonStock: number = 0;
  public liabilities: number = 0;

  private valueCache: { [key: string]: number } = {};

  addTransaction(details: ITransaction) {
    const { cash, commonStock } = details;

    this.cash += cash;
    this.commonStock += commonStock;
    this.clearValueCache();
  }

  private clearValueCache() {
    this.valueCache = {};
  }
}
