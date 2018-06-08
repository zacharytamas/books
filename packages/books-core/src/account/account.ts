/**
 * An Account.
 */
export class Account {
  public name: string;
  public transactions = [];

  public constructor(name: string) {
    this.name = name;
  }
}
