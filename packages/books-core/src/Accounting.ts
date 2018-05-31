interface ITransaction {
  assetAccount: AssetAccounts;
  equityAccount?: EquityAccounts;
  amount: number;
}

export enum AssetAccounts {
  cash = 'cash'
}

export enum LiabilityAccounts {}

export enum EquityAccounts {
  commonStock = 'commonStock'
}

export class Accounting {
  public get assets() {
    return this.getOrSetCache('assets', () => this.cash);
  }

  public get equity() {
    return this.getOrSetCache('equity', () => this.commonStock);
  }

  public cash: number = 0;
  public commonStock: number = 0;
  public liabilities: number = 0;

  private valueCache: { [key: string]: number } = {};

  addTransaction(details: ITransaction) {
    const { assetAccount, equityAccount, amount } = details;

    this[assetAccount] += amount;
    this[equityAccount] += amount;

    this.clearValueCache();
  }

  private getOrSetCache(key: string, valueFunc: () => number) {
    const cachedValue = this.valueCache[key];
    return cachedValue || (this.valueCache[key] = valueFunc());
  }

  private clearValueCache() {
    this.valueCache = {};
  }
}
