---
sidebar_position: 6
---

# 6. A Transfer with a Tax Rate

A linear conservation law: three parties hold balances, and the total must be preserved across every transaction.

```ts
// e₀ = Alice, e₁ = Bob, e₂ = Treasury
const accounts = new MultiPoly([
  new Monomial(1n, [1, 0, 0]),
  new Monomial(1n, [0, 1, 0]),
  new Monomial(1n, [0, 0, 1]),
]);

const alice    = 300n;
const bob      = 700n;
const treasury = 0n;

const S = accounts.evaluate([alice, bob, treasury]);  // 1000n
```

Bob sends `amount` to Alice with a 1-in-10 fraction retained by the treasury. That fraction — $\text{tax}/\text{amount} = 1/10$ — is the proportion from [§5](./5-Logic.md).

## The incommensurability

A proportional split requires division. In box arithmetic there is no division primitive — and that is the point: **the split is only well-defined when the denominator divides the numerator exactly**. An `amount` of `99` with a 1-in-10 rate has no valid integer split. That is an incommensurability in the same sense as §2: no natural number satisfies the relation.

The caller-proposes pattern from [§7](./7-ConstantProduct.md) resolves this cleanly. The caller is responsible for finding a valid `(tax, received)` pair. The contract only asserts:

1. **Proportion** — $10 \cdot \text{tax} = \text{amount}$, i.e. the proportion $1:10$ expressed as a product identity with no division
2. **Decomposition** — $\text{tax} + \text{received} = \text{amount}$
3. **Conservation** — the total is unchanged

```ts
function transfer(
  alice: bigint, bob: bigint, treasury: bigint,
  amount: bigint,
  tax: bigint,      // caller proposes
  received: bigint  // caller proposes
): [bigint, bigint, bigint] {
  if (bob < amount) throw new Error('insufficient balance');

  // proportion: 10·tax = amount  (product identity — no division)
  if (10n * tax !== amount) throw new Error('incommensurable split');
  if (tax + received !== amount) throw new Error('decomposition mismatch');

  const next: [bigint, bigint, bigint] = [alice + received, bob - amount, treasury + tax];
  if (accounts.evaluate(next) !== S) throw new Error('invariant violated');

  return next;
}
```

No division in the contract. The proportion check fires when the split is incommensurable — when `amount` is not a multiple of `10`, there is no `(tax, received)` the caller can honestly propose. The incommensurability is surfaced explicitly rather than silently truncated.

## Confirming the math

```ts
// amount = 100, valid split: tax = 10, received = 90
const [aliceNew, bobNew, treasuryNew] = transfer(300n, 700n, 0n, 100n, 10n, 90n);

// aliceNew    === 390n
// bobNew      === 600n
// treasuryNew === 10n

accounts.evaluate([aliceNew, bobNew, treasuryNew]);  // 1000n  ✓
```

```ts
// amount = 99 — no valid proposal exists, proportion check fires
transfer(300n, 700n, 0n, 99n, 9n, 90n);
// 10n * 9n = 90n ≠ 99n  → 'incommensurable split'
```

The unit of account must be chosen so that every valid `amount` is a multiple of the tax denominator. That is the same prescription as §2's Babylonian observation: choose your integer representation to make the required divisibility exact.
