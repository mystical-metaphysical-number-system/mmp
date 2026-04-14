---
sidebar_position: 2
---

# 2. Incommensurability — √2 and Integer Powers

Box arithmetic has no fractions, so quantities like √2 — numbers whose square is a natural number but which are not themselves natural numbers — require a different treatment than you might expect.

## The exact statement

√2 is the positive solution to $x^2 = 2$. Checking natural numbers:

```ts
const xSquared = new Monomial(1n, [2]);
xSquared.evaluate([1n]);  // 1n — below 2
xSquared.evaluate([2n]);  // 4n — above 2
```

There is no natural number `n` where `xSquared.evaluate([n]) === 2n`. Box arithmetic does not pretend otherwise — the polynomial $x^2 = 2$ is the exact object. What does not exist is a natural number equal to √2.

## Stuffing the root behind an integer power

The practical pattern is: **never compute √2 as a value — square both sides and work with the relation in proportion form.**

Instead of asserting $a = \sqrt{2} \cdot b$ (which requires a non-integer), assert $a^2 = 2b^2$, i.e., the proportion:

$$
a^2 : b^2 = 2 : 1 \quad\Longleftrightarrow\quad a^2 = 2 \cdot b^2
$$

This is a natural number equality — both sides are box arithmetic objects, and it can be checked without any approximation:

```ts
const a2 = new Monomial(1n, [2, 0]);  // a²
const b2 = new Monomial(2n, [0, 2]);  // 2b²

// Is 3² = 2 × 2²?  →  9 vs 8  — close, not exact
a2.evaluate([3n, 2n]) === b2.evaluate([3n, 2n]);  // 9n !== 8n

// Is 7² = 2 × 5²?  →  49 vs 50  — one off
a2.evaluate([7n, 5n]) === b2.evaluate([7n, 5n]);  // 49n !== 50n

// Is 17² = 2 × 12²?  →  289 vs 288  — one off, tighter
a2.evaluate([17n, 12n]) === b2.evaluate([17n, 12n]);  // 289n !== 288n
```

Each pair $(a, b)$ is a Pell equation candidate. The gap shrinks but never closes — that is the precise meaning of $\sqrt{2} \notin \mathbb{N}$, expressed entirely in natural number arithmetic. The same proportion check (`100n * tax !== 10n * amount` style from [§6](./6-Transfer.md)) applies here: no division, no float, no approximation — just two products that must match.

## In practice

This pattern carries through to the FIA (see [Box Math & Primes](../../ArchaeoArithmetic/BoxMathPrimes.md)), bonding curves, and any invariant involving a square root: square the invariant and enforce the squared relation. The integer domain is preserved throughout, and the Pell-equation structure of the near-misses is an explicit, auditable residual rather than hidden rounding error.

:::note Babylonian approximation
When you genuinely need an integer approximation of √n — e.g. for a Uniswap-style liquidity computation — the Babylonian method (used by Uniswap v2) finds $\lfloor\sqrt{n}\rfloor$ in pure integer arithmetic. That pattern is covered in the [Degree Truncation addendum](./A-Truncation.md).
:::
