---
sidebar_position: 7
---

# 7. Constant Product Invariant

The AMM constant product curve is the multiplicative analogue of the linear conservation law from [§6](./6-Transfer.md):

$$
x \cdot y = k
$$

A single monomial, coefficient $1$, exponents $[1, 1]$ — degree 2 in two reserve variables:

```ts
const xy = new Polynumber(1n, [1, 1]);
```

The **invariant** $k$ is locked at pool creation:

```ts
const reserveIn  = 1000n;
const reserveOut = 500n;

const k = xy.evaluate([reserveIn, reserveOut]);  // 500000n
```

## swap: the contract asserts, the caller proves

The key insight: the pool never needs to *compute* `amountOut`. The caller proposes both sides of the trade; the pool just checks the invariant holds. No division on-chain.

```ts
function swap(
  reserveIn: bigint,
  reserveOut: bigint,
  amountIn: bigint,
  amountOut: bigint  // proposed by caller
): void {
  const k = xy.evaluate([reserveIn, reserveOut]);

  const newReserveIn  = reserveIn  + amountIn;
  const newReserveOut = reserveOut - amountOut;

  if (xy.evaluate([newReserveIn, newReserveOut]) < k)
    throw new Error('invariant violated');
}
```

No division. The invariant check is two multiplications — the same cross-multiplication pattern as the proportion check in [§6](./6-Transfer.md).

Note the comparison is `< k`, not `!== k`. The caller can understate `amountOut` and the pool keeps the surplus — that surplus is the fee. Overstating `amountOut` fires the guard. The pool can only ever grow.

```ts
// caller computes off-chain: amountOut = k / newReserveIn = 500000 / 1100 = 454
swap(1000n, 500n, 100n, 454n);

// xy.evaluate([1100n, 46n])  → 1100 * 46 = 50600  ✗  — wrong, caller made an error
// xy.evaluate([1100n, 454n]) → 1100 * 454 = 499400 ≥ 500000?  → 499400 < 500000 → guard fires
// xy.evaluate([1100n, 455n]) → 1100 * 455 = 500500 ≥ 500000  ✓  — caller rounds conservatively
swap(1000n, 500n, 100n, 455n);  // passes — pool keeps the 500 surplus
```

The caller bears the rounding responsibility. The contract only ever multiplies.

## Confirming the math

For a trade where the division is exact — `newReserveIn | k`:

```ts
// off-chain: 500000 / 1250 = 400 exactly
swap(1000n, 500n, 250n, 100n);

// newReserveIn  = 1250n
// newReserveOut = 500n - 100n = 400n
// xy.evaluate([1250n, 400n]) = 500000n === k  ✓
```
