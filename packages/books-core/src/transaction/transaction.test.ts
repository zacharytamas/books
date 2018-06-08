describe('Transaction', () => {
  test('Transaction exists', () => {
    const transaction = {
      amount: 500,
      entryId: '1235'
    };

    // Thinking in text:
    // - A `Transaction` is a change inside an `Account`.
    // - They are always linked to an `Entry` inside a `Journal`.
    // - `Journal`s have many `Entry`s, `Entry`s can have many
    //   `Transactions`.
    //   - For example, an Entry for an asset exchange would have two
    //     transactions in two separate accounts: a decrease in one account
    //     and an increase in the other account.
  });
});
