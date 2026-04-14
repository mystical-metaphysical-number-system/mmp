---
sidebar_position: 1
---

# BoxMath SDK Introduction

> New to polynumbers? Start with [Encoding Familiar Mathematics](./Encoding.md) — it derives the mapping from standard polynomials to the box arithmetic encoding before introducing the API.

This page documents the `boxmath` TypeScript package and the `BoxMath.sol` Solidity contract — the computational substrate for box arithmetic in MMP. Both live in the monorepo under `boxmath/` and `hardhat/contracts/`, and the hardhat test suite verifies they produce identical results.

## Integers All The Way Down

Box arithmetic as defined by Wildberger is **purely integer-valued**. Natural numbers are boxes of empty boxes; polynumber coefficients are natural numbers; all arithmetic — addition, Cauchy multiplication, powers — stays within the naturals. There is no concept of a fraction or decimal in the foundation.

This maps directly onto what Solidity and TypeScript `bigint` actually are: unbounded integers. A polynumber like $2 + 3\alpha + 5\alpha^2$ has coefficients $\{2, 3, 5\}$ — raw integers, nothing else needed:

```ts
import { Monomial, MultiPoly } from 'boxmath';

// 2x + 3y + 5z  — coefficients are just integers
const f = new MultiPoly([
  new Monomial(2n, [1]),
  new Monomial(3n, [0, 1]),
  new Monomial(5n, [0, 0, 1]),
], 0);  // precision = 0: no scaling

f.evaluate([1n, 2n, 3n]);  // 2·1 + 3·2 + 5·3 = 23n
```

The `precision = 0` parameter tells the evaluation engine to use scale `1n` — i.e. plain integers throughout. `pow(2n, 3, 1n)` gives `8n`; `pow(n, 0, 1n)` gives `1n`. The identity $n^0 = 1$ falls out structurally: the empty exponent vector contributes a multiplicative identity.

## The Fixed-Point Layer (DeFi / AMM Use Case)

The `SCALE = 10**18` in `BoxMath.sol` and the `precision = 18` default in `MultiPoly` are **not** box arithmetic primitives. They are a convention borrowed from Ethereum's token encoding: since Solidity has no native fractions, token amounts like "100.5 USDC" are stored as integers by multiplying by a fixed scale factor ($10^6$ for USDC, $10^{18}$ for ETH). When you need to evaluate a polynomial at a fractional point — say, a token price — you first encode the inputs as scaled integers, and then every multiply needs a compensating divide by `SCALE`:

$$
\hat{x} \cdot \hat{y} = (x \cdot S)(y \cdot S) = xy \cdot S^2 \quad \Rightarrow \quad \text{divide by } S \text{ to get } \hat{xy} = xy \cdot S
$$

```ts
import { pow } from 'boxmath';

const SCALE = 10n ** 18n;
pow(2n * SCALE, 3, SCALE);  // 8n * SCALE  (2^3 = 8, re-encoded)
```

If your inputs are already integers (natural numbers in the box arithmetic sense), set `precision = 0` and skip the scale entirely. The fixed-point layer is opt-in.

---

## Monomial — A Single Box Term

In Wildberger's polynumbers, a **polynumber** is a box of naturals, e.g. $\langle 0, 2, 1 \rangle$ representing $1 + \alpha^2 + \alpha^4$. A single element of that box — one exponent with its coefficient — is a **monomial**.

```
Monomial(coefficient: bigint, exponents: number[])
```

| Field | Box arithmetic meaning |
|-------|----------------------|
| `coefficient` | Natural number (bigint) scalar weight of this term |
| `exponents[i]` | Power of variable $x_i$ in this term |
| `degree` | $\sum_i$ `exponents[i]` — total degree |
| `extent` | Index of the last nonzero variable |

### Construction

```ts
import { Monomial } from 'boxmath';

// 1·x  (coefficient = 1, x^1)
const x = new Monomial(1n, [1]);

// 1·x·y  (x^1 · y^1)
const xy = new Monomial(1n, [1, 1]);

// 2·x²·z
const term = new Monomial(2n, [2, 0, 1]);
```

### Evaluation

`monomial.evaluate(point, precision)` substitutes values into the term:

$$
\text{evaluate}(c,\, [e_1,\ldots,e_n],\, [a_1,\ldots,a_n]) = c \cdot \prod_i a_i^{e_i}
$$

With integers (`precision = 0`):

```ts
const xy = new Monomial(1n, [1, 1]);
xy.evaluate([100n, 200n], 0);  // 1 · 100 · 200 = 20000n
```

With the DeFi fixed-point layer (`precision = 18`), inputs and coefficient are pre-multiplied by `SCALE`:

```ts
const SCALE = 10n ** 18n;
const xy = new Monomial(SCALE, [1, 1]);
xy.evaluate([100n * SCALE, 200n * SCALE], 18);  // 20000n * SCALE
```

The Solidity equivalent is `evaluateMonomial`:

```solidity
evaluateMonomial(coefficient, exponents, point)
```

The hardhat test `"Should evaluate constant product xy correctly"` verifies the two return the same `bigint` / `uint256`.

### Multiplication

`monomial.multiply(other)` adds exponent vectors and multiplies coefficients — this is the **product rule** for monomials, and corresponds to placing two box elements side by side under the caret `^` operator:

```ts
const x  = new Monomial(1n, [1]);
const y  = new Monomial(1n, [0, 1]);
const xy = x.multiply(y);  // Monomial(1n, [1, 1])  — coefficient 1·1 = 1
```

> **Note (DeFi layer):** If you use pre-scaled coefficients (`coefficient = SCALE` to represent "1.0"), `multiply` produces a coefficient of `SCALE²`. You must divide by `SCALE` once after the fact to normalise. The evaluation path in `MultiPoly.multiply` handles this implicitly, but reading `coefficient` directly off a product of scaled monomials will appear inflated by one factor of `SCALE`.

---

## MultiPoly — A Box of Monomials

A `MultiPoly` is a **multiset of monomials** — a box whose elements are polynomial terms. This directly implements Wildberger's polynumber as a multiset:

$$
p = \langle m_1,\, m_2,\, \ldots,\, m_k \rangle
$$

where each $m_i$ is a monomial. Repetition is allowed; order does not matter.

```ts
import { MultiPoly, Monomial } from 'boxmath';

// p(x, y) = xy  (single monomial, integer coefficients)
const p = new MultiPoly([new Monomial(1n, [1, 1])], 0);
```

### Factory helpers

`MultiPoly.linear(coeffs, precision)` builds $\sum_i c_i x_i$. With `precision = 0` the coefficients are used as-is:

```ts
// f(x, y, z) = 2x + 3y + 5z
const f = MultiPoly.linear([2, 3, 5], 0);
f.evaluate([1n, 2n, 3n]);  // 2·1 + 3·2 + 5·3 = 23n
```

`MultiPoly.constant(value, precision)` wraps a scalar as a degree-zero polynomial:

```ts
const k = MultiPoly.constant(42n, 0);
```

### Addition — Box Union

`p.add(q)` concatenates term lists. This is **box union with multiplicity** — the result is a multiset containing every element of both $p$ and $q$, with repetition:

$$
\langle m_1, m_2 \rangle + \langle m_3 \rangle = \langle m_1, m_2, m_3 \rangle
$$

```ts
const px = new MultiPoly([new Monomial(2n, [1])], 0);   // 2x
const py = new MultiPoly([new Monomial(3n, [0, 1])], 0); // 3y
const sum = px.add(py);  // 2x + 3y  (two terms in the box)
```

Note this is **not** algebraic simplification — `x.add(x)` produces a box with two copies of `x`, not `2x`. That is correct for the box model: $\langle x, x \rangle \neq \langle 2x \rangle$. If you need like-term collapse for display or numeric purposes, call `evaluate` directly.

### Multiplication — Cartesian Product

`p.multiply(q)` computes every pairwise `monomial.multiply` between the two term lists. This is the **box product** from the PDF:

$$
A \times B = \{ a \cdot b \mid a \in A,\, b \in B \}
$$

In polynomial terms this is the standard Cauchy product — every pair of terms contributes one term to the result:

```ts
const B = new MultiPoly([
  new Monomial(1n, []),           // 1  (constant)
  new Monomial(1n, [0,0,0,1]),    // x₃
  new Monomial(1n, [0,0,1,0,1])  // x₂x₄
], 18);

const C = new MultiPoly([
  new Monomial(1n, [0,2]),        // y²
  new Monomial(1n, [0,0,1,0,1])  // x₂x₄
], 18);

const BC = B.multiply(C);
BC.terms.length; // 6  (3 × 2 pairs)
```

This matches Exercise 8 in the PDF: the Cartesian product of two polynomial boxes yields all pairwise monomials.

---

## BoxMath.sol — The On-Chain Kernel

The Solidity contract exposes the numeric primitives needed to evaluate polynomials on-chain. It is deliberately minimal — `MultiPoly` composition happens off-chain, with only single-monomial evaluation and the constant product formula needed on-chain.

```solidity
contract BoxMath {
    uint256 public constant PRECISION = 18;
    uint256 public constant SCALE     = 10**PRECISION;

    function pow(uint256 base, uint256 exp) public pure returns (uint256);
    function evaluateMonomial(
        uint256 coefficient,
        uint256[] memory exponents,
        uint256[] memory point
    ) public pure returns (uint256);
    function constantProduct(uint256 x, uint256 y) public pure returns (uint256);
}
```

| Function | TS equivalent | Notes |
|----------|--------------|-------|
| `pow(base, exp)` | `utils.pow(base, exp, SCALE)` | Solidity contract hardcodes `SCALE = 10^18`; use integer inputs scaled accordingly |
| `evaluateMonomial(c, e, p)` | `new Monomial(c, e).evaluate(p, 18)` | Inputs/coefficient must be pre-scaled by `SCALE` to match |
| `constantProduct(x, y)` | `new Monomial(SCALE,[1,1]).evaluate([x,y], 18)` | AMM $x \cdot y = k$; inputs are token amounts in wei |

The contract is written for the DeFi use case and hardcodes `SCALE`. All three functions produce identical results to their TypeScript counterparts when both sides use `precision = 18` — verified in `hardhat/test/BoxMath.ts`. For pure integer box arithmetic off-chain, use the TypeScript package with `precision = 0`.

### Using BoxMath.sol with ethers

```ts
import { Monomial } from 'boxmath';

const boxMath = await ethers.deployContract('BoxMath');
const SCALE   = 10n ** 18n;

const x = 100n * SCALE;
const y = 200n * SCALE;

// On-chain
const k_sol = await boxMath.constantProduct(x, y);

// Off-chain — identical result
const k_js  = new Monomial(SCALE, [1, 1]).evaluate([x, y], 18);

k_sol === k_js; // true
```

---

## Relationship to the Full PDF

The implemented subset covers:

| PDF concept | Implementation |
|-------------|---------------|
| Natural number | `bigint` — plain integer, no scaling needed |
| Monomial (single box element) | `Monomial(coeff: bigint, exponents: number[])` |
| Polynumber (box of naturals as poly) | `MultiPoly` — list of monomials |
| Box addition (multiset union) | `MultiPoly.add` — concatenation |
| Box multiplication (Cauchy product) | `MultiPoly.multiply` — Cartesian product of terms |
| Power $n^k$ | `utils.pow(n, k, 1n)` with `scale = 1n` for integers |
| Evaluation $p(A)$ | `MultiPoly.evaluate(point)` with `precision = 0` |
| Fractional / DeFi inputs | `precision = 18`, `SCALE = 10^18` — optional overlay |

The **caret** `A ^ B` on raw natural-number boxes (§8 of the PDF), **size / multiplicity / truncation / setbox / union / intersection**, **multinumbers**, **pixels**, **vexels**, and **maxels** are not yet implemented — the library focuses on the polynomial / evaluation layer that is directly useful for smart contract numerics.
