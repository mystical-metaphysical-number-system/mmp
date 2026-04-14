---
sidebar_position: 6
---

# 6. A Transfer with a Tax Rate

A transfer with a tax illustrates both a conservation law *and* the proportion from [§5](./5-Logic.md) in one example. Three parties hold balances — Alice, Bob, and a treasury — and we require that the total is preserved across every transaction.

Model the three accounts as variables in a `MultiPoly`:

```ts
// e₀ = Alice, e₁ = Bob, e₂ = Treasury
const accounts = new MultiPoly([
  new Monomial(1n, [1, 0, 0]),  // Alice
  new Monomial(1n, [0, 1, 0]),  // Bob
  new Monomial(1n, [0, 0, 1]),  // Treasury
]);

const alice    = 300n;
const bob      = 700n;
const treasury = 0n;

const S = accounts.evaluate([alice, bob, treasury]);  // 1000n
```

Bob sends `amount` to Alice with a 10% tax retained by the treasury. The proportion $\text{tax} : \text{amount} = 10 : 100$ lives as the product identity $100 \cdot \text{tax} = 10 \cdot \text{amount}$.

## Asserting the invariant

A `transfer` function computes the new state and requires the conservation law to hold before returning:

```ts
function transfer(
  alice: bigint, bob: bigint, treasury: bigint,
  amount: bigint
): [bigint, bigint, bigint] {
  if (bob < amount) throw new Error('insufficient balance');

  // compute tax, then assert the proportion — never trust a truncating division
  const tax      = amount / 10n;
  const received = amount - tax;

  // proportion check: tax : amount = 10 : 100  ⟺  100·tax = 10·amount
  // catches any silent truncation from the division above
  if (100n * tax !== 10n * amount) throw new Error('tax proportion not exact');

  const next: [bigint, bigint, bigint] = [alice + received, bob - amount, treasury + tax];

  // conservation invariant
  if (accounts.evaluate(next) !== S) throw new Error('invariant violated');

  return next;
}
```

:::note No floating point — but bigint division silently truncates
`bigint` is exact arbitrary-precision integer arithmetic, not IEEE 754. There is no floating point rounding. The trap is different: `99n / 10n` gives `9n` silently — bigint truncates on inexact division without throwing.

The proportion check (`100n * tax !== 10n * amount`) is the box arithmetic solution: assert the cross-multiplication identity rather than trusting the division result. If `amount / 10n` truncated, the guard fires.
:::

The `accounts.evaluate` call is the machine-checkable statement of "nothing was created or destroyed."

## Confirming the math

```ts
const [aliceNew, bobNew, treasuryNew] = transfer(alice, bob, treasury, 100n);

// aliceNew    === 390n  (300 + 90)
// bobNew      === 600n  (700 − 100)
// treasuryNew === 10n   (0 + 10)

accounts.evaluate([aliceNew, bobNew, treasuryNew]);  // 1000n  ✓
```

Two natural number constraints must hold for this to be defined at all:

1. `bob >= amount` — subtraction must stay natural
2. `10n | amount` — the 10% tax division must be exact

A transfer of `99` tokens at 10% produces `tax = 9` (truncated — remainder $90$), meaning $10$ tokens vanish. Choosing the token unit to be a multiple of $10$ makes every valid transfer lossless.
