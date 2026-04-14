---
sidebar_position: 4
---

# 4. Multivariate: Base Multinumbers

To go beyond one variable, Wildberger introduces **base multinumbers** — a family of primitive elements, one for each natural number index:

$$
e_0,\; e_1,\; e_2,\; e_3,\;\ldots
$$

Each $e_n$ is just a tag — a box holding the natural number $n$. Polynomials in multiple variables are formed by taking products and sums of these tags with natural number coefficients. So where ordinary algebra writes $x$ and $y$, box arithmetic writes $e_0$ and $e_1$ (or any two distinct indices).

A monomial in several variables is a product of base multinumbers:

$$
e_1^2 \cdot e_3 = e_1 e_1 e_3
$$

In `boxmath`, `exponents[i]` is the power of $e_i$:

| Monomial | Exponent vector |
|----------|----------------|
| $1$ (constant) | `[]` |
| $e_1$ | `[0, 1]` |
| $e_1^2$ | `[0, 2]` |
| $e_2 e_4$ | `[0, 0, 1, 0, 1]` |
| $e_1^2 e_3$ | `[0, 2, 0, 1]` |

:::tip Coefficients are just the natural number scalar
`new Monomial(2n, [0,0,0,1])` is $2e_3$ — the exponent vector says *which* variables appear and at what power; the first argument is the natural number coefficient. So $1 + 2e_3 + e_2 e_4$ encodes as:
```ts
new MultiPoly([
  new Monomial(1n, []),          // 1
  new Monomial(2n, [0,0,0,1]),   // 2e₃
  new Monomial(1n, [0,0,1,0,1]), // e₂e₄
]);
```
:::

:::note Trailing zeros can always be dropped
Wildberger states explicitly: *"adding or removing final 0 entries does not change the representation."* The reason is that $e_i^0 = 1$ for any $i$ — an exponent of zero contributes nothing to the product. So `[0,0,0,1]` and `[0,0,0,1,0]` are the same monomial ($e_3$). The library respects this: `Monomial.evaluate` only multiplies when `exponents[i] > 0`, and `Monomial.extent` finds the last nonzero index and ignores everything after it.
:::

## Wildberger's worked example (PDF §3.5)

> *"If $B = 1 + e_3 + e_2 e_4$ and $C = e_1^2 + e_2 e_4$ then $B \cdot C = e_1^2 + e_2 e_4 + e_1^2 e_3 + e_2 e_3 e_4 + e_1^2 e_2 e_4 + e_2^2 e_4^2$."*

The product is every pairwise combination of a term from $B$ with a term from $C$ — $3 \times 2 = 6$ terms total:

```ts
import { Monomial, MultiPoly } from 'boxmath';

const B = new MultiPoly([
  new Monomial(1n, []),          // 1
  new Monomial(1n, [0,0,0,1]),   // e₃
  new Monomial(1n, [0,0,1,0,1]), // e₂e₄
]);

const C = new MultiPoly([
  new Monomial(1n, [0,2]),       // e₁²
  new Monomial(1n, [0,0,1,0,1]), // e₂e₄
]);

const BC = B.multiply(C);
BC.terms.length;  // 6

BC.terms.map(t => t.toString(['e0','e1','e2','e3','e4']));
// ['e1^2', 'e2e4', 'e1^2e3', 'e2e3e4', 'e1^2e2e4', 'e2^2e4^2']
```

The exponent vectors add component-wise under `multiply` — the box product rule.
