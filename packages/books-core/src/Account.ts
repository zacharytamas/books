interface ITransaction {
  amount: number;
}

type SubscribeFunction = (account: Account) => void;

// TODO This will eventually be replaced via RxJS but I am on a plane
// TODO without Internet access and cannot install it.
class Subscribable {
  subscribers: SubscribeFunction[] = [];

  subscribe(listener: SubscribeFunction) {
    this.subscribers.push(listener);
  }

  protected notifySubscribers() {
    this.subscribers.forEach(s => s(this as any));
  }
}

export class Account extends Subscribable {
  get balance() {
    return this.balanceCached === undefined
      ? (this.balanceCached = this.calculateBalance())
      : this.balanceCached;
  }
  transactions: ITransaction[] = [];

  private balanceCached: number = this.calculateBalance();

  constructor(public accountName: string) {
    super();
  }

  addTransaction(transaction: ITransaction) {
    this.transactions.push(transaction);
    this.balanceCached += transaction.amount;
    this.notifySubscribers();
  }

  private calculateBalance() {
    return this.transactions.reduce((acc, t) => acc + t.amount, 0);
  }
}
