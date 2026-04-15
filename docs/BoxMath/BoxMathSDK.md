---
sidebar_position: 1
---

# BoxMath SDK Introduction

> New to polynumbers? Start with [Encoding Familiar Mathematics](../category/encoding-familiar-mathematics) — it derives the mapping from standard polynomials to the box arithmetic encoding before introducing the API.

This page documents the `boxmath` TypeScript package and the `BoxMath.sol` Solidity contract — the computational substrate for box arithmetic in MMP. Both live in the monorepo under `boxmath/` and `hardhat/contracts/`, and the hardhat test suite verifies they produce identical results.

## Integers All The Way Down

Box arithmetic as defined by Wildberger is **purely integer-valued**. Natural numbers are boxes of empty boxes; polynumber coefficients are natural numbers; all arithmetic — addition, Cauchy multiplication, powers — stays within the naturals. There is no concept of a fraction or decimal in the foundation.

This maps directly onto what Solidity and TypeScript `bigint` actually are: unbounded integers. A polynumber like $2 + 3\alpha + 5\alpha^2$ has coefficients $\{2, 3, 5\}$ — raw integers, nothing else needed:

```ts
import { Monomial, MultiPoly } from 'boxmath';

const f = new MultiPoly([
  new Monomial(2n, [1]),
  new Monomial(3n, [0, 1]),
  new Monomial(5n, [0, 0, 1]),
]);

f.evaluate([1n, 2n, 3n]);  // 2·1 + 3·2 + 5·3 = 23n
```

The identity $n^0 = 1$ falls out structurally: the empty exponent vector contributes a multiplicative identity, and `pow(n, 0)` returns `1n` by definition.

---

## Monomial — A Single Box Term

In Wildberger's polynumbers, a **polynumber** is a box of naturals, e.g. $\langle 0, 2, 1 \rangle$ representing $1 + \alpha^2 + \alpha^4$. A single element of that box — one exponent with its coefficient — is a **monomial**.

```
Monomial(coefficient: bigint, exponents: number[])
```

| Field | Box arithmetic meaning |
|-------|----------------------|
| `coefficient` | Natural number scalar weight of this term |
| `exponents[i]` | Power of variable $x_i$ in this term |
| `degree` | $\sum_i$ `exponents[i]` — total degree |
| `extent` | Index of the last nonzero variable |

### Construction

```ts
import { Monomial } from 'boxmath';

const x    = new Monomial(1n, [1]);       // x
const xy   = new Monomial(1n, [1, 1]);    // xy
const term = new Monomial(2n, [2, 0, 1]); // 2x²z
```

### Evaluation

`monomial.evaluate(point)` substitutes values into the term:

$$
\text{evaluate}(c,\, [e_1,\ldots,e_n],\, [a_1,\ldots,a_n]) = c \cdot \prod_i a_i^{e_i}
$$

```ts
const xy = new Monomial(1n, [1, 1]);
xy.evaluate([100n, 200n]);  // 1 · 100 · 200 = 20000n
```

### Multiplication

`monomial.multiply(other)` adds exponent vectors and multiplies coefficients — the **product rule** for monomials, corresponding to placing two box elements side by side under the caret `^` operator:

```ts
const x  = new Monomial(1n, [1]);
const y  = new Monomial(1n, [0, 1]);
const xy = x.multiply(y);  // Monomial(1n, [1, 1])
```

---

## MultiPoly — A Box of Monomials

A `MultiPoly` is a **multiset of monomials** — a box whose elements are polynomial terms. This directly implements Wildberger's polynumber as a multiset:

$$
p = \langle m_1,\, m_2,\, \ldots,\, m_k \rangle
$$

where each $m_i$ is a monomial. Repetition is allowed; order does not matter.

```ts
import { MultiPoly, Monomial } from 'boxmath';

// p(x, y) = xy
const p = new MultiPoly([new Monomial(1n, [1, 1])]);
```

### Factory helpers

`MultiPoly.linear(coeffs)` builds $\sum_i c_i x_i$:

```ts
const f = MultiPoly.linear([2, 3, 5]);
f.evaluate([1n, 2n, 3n]);  // 23n
```

`MultiPoly.constant(value)` wraps a scalar as a degree-zero polynomial:

```ts
const k = MultiPoly.constant(42n);
```

### Addition — Box Union

`p.add(q)` concatenates term lists. This is **box union with multiplicity** — the result is a multiset containing every element of both $p$ and $q$, with repetition:

$$
\langle m_1, m_2 \rangle + \langle m_3 \rangle = \langle m_1, m_2, m_3 \rangle
$$

```ts
const px = new MultiPoly([new Monomial(2n, [1])]);    // 2x
const py = new MultiPoly([new Monomial(3n, [0, 1])]); // 3y
const sum = px.add(py);  // 2x + 3y
```

Note this is **not** algebraic simplification — `x.add(x)` produces a box with two copies of `x`, not `2x`. That is correct for the box model: $\langle x, x \rangle \neq \langle 2x \rangle$.

### Multiplication — Cartesian Product

`p.multiply(q)` computes every pairwise `monomial.multiply` between the two term lists. This is the **box product**:

$$
A \times B = \{ a \cdot b \mid a \in A,\, b \in B \}
$$

```ts
const B = new MultiPoly([
  new Monomial(1n, []),
  new Monomial(1n, [0,0,0,1]),
  new Monomial(1n, [0,0,1,0,1]),
]);
const C = new MultiPoly([
  new Monomial(1n, [0,2]),
  new Monomial(1n, [0,0,1,0,1]),
]);
B.multiply(C).terms.length;  // 6  (3 × 2 pairs)
```

### Truncation

`p.truncate(k)` drops all terms with `degree > k`:

```ts
const p = new MultiPoly([
  new Monomial(2n, []),
  new Monomial(3n, [1]),
  new Monomial(1n, [2]),  // dropped
]);
p.truncate(1).evaluate([5n]);  // 17n  (2 + 3·5)
```

---

## BoxMath.sol — The On-Chain Mirror

The Solidity contract exposes the same primitives as the TypeScript package. Both use exact `uint256` / `bigint` integer arithmetic — no `SCALE`, no fixed-point division. See the [Solidity API reference](./API/Solidity) for the full function list and the ethers v6 decoding caveat for struct-returning functions.

```solidity
contract BoxMath {
    struct Monomial  { uint256 coefficient; uint256[] exponents; }
    struct MultiPoly { Monomial[] terms; }

    function pow(uint256 base, uint256 exp) public pure returns (uint256);
    function caretProduct(uint256[][] memory boxes) public pure returns (uint256[] memory);
    function evaluateMonomial(Monomial memory m, uint256[] memory point) public pure returns (uint256);
    function multiplyMonomials(Monomial memory a, Monomial memory b) public pure returns (Monomial memory);
    function evaluateMultiPoly(MultiPoly memory p, uint256[] memory point) public pure returns (uint256);
    function addMultiPoly(MultiPoly memory a, MultiPoly memory b) public pure returns (MultiPoly memory);
    function multiplyMultiPoly(MultiPoly memory a, MultiPoly memory b) public pure returns (MultiPoly memory);
    function truncate(MultiPoly memory p, uint256 k) public pure returns (MultiPoly memory);
    function monomialDegree(Monomial memory m) public pure returns (uint256);
}
```

## PixelMath.sol — Ordered Pairs and Linear Algebra

`PixelMath.sol` implements the ordered-pair layer: **pixels** (2-listboxes) and **vexels** (coefficient vectors over singletons). These are the building blocks for linear algebra in box arithmetic — pixels generalise matrix index pairs, and vexels generalise vectors.

```solidity
contract PixelMath {
    struct Pixel { uint256 m; uint256 n; }

    // pixel product: [m,n]·[p,q] = [m,q] when n = p, otherwise ok = false (nothing)
    function pixelProduct(Pixel memory a, Pixel memory b)
        public pure returns (bool ok, Pixel memory result);

    function pixelTranspose(Pixel memory p) public pure returns (Pixel memory);
    function pixelIsDiagonal(Pixel memory p) public pure returns (bool);

    // pixel [m,n] with m > n > 0 → (m²−n², 2mn, m²+n²)
    function pythagoreanTriple(Pixel memory p)
        public pure returns (bool ok, uint256 a, uint256 b, uint256 c);

    // Vexel ops — dense uint256[] coefficient vectors
    function vexelAdd(uint256[] memory u, uint256[] memory v) public pure returns (uint256[] memory);
    function vexelScale(uint256[] memory u, uint256 scalar) public pure returns (uint256[] memory);
    function vexelDot(uint256[] memory u, uint256[] memory v) public pure returns (uint256);
}
```

---

## Relationship to the Full PDF

| PDF concept | Implementation |
|-------------|---------------|
| Natural number | `bigint` / `uint256` — plain integers |
| Monomial (single box element) | `Monomial(coeff, exponents)` |
| Polynumber (box of naturals as poly) | `MultiPoly` — list of monomials |
| Box addition (multiset union) | `MultiPoly.add` / `addMultiPoly` |
| Box multiplication (Cauchy product) | `MultiPoly.multiply` / `multiplyMultiPoly` |
| Power $n^k$ | `pow(n, k)` |
| Evaluation $p(A)$ | `MultiPoly.evaluate` / `evaluateMultiPoly` |
| Truncation to degree $k$ | `MultiPoly.truncate` / `truncate` |
| Caret product $A \mathbin{\hat{}} B$ | `caretProduct` / `caretProduct` |
| Singleton $[n]$ (1-listbox) | natural number index — no separate class needed |
| Pixel $[m,n]$ (2-listbox) | `Pixel` / `PixelMath.sol` |
| Vexel (box of singletons) | `Vexel` / `vexelAdd`, `vexelDot`, `vexelScale` |
| Maxel (box of pixels) | `Maxel` / `maxelProduct`, `maxelTranspose` |

The following are documented in the paper but not yet implemented:

| PDF section | Concept | Notes |
|-------------|---------|-------|
| §5.4 | Action of maxels on vexels | Left/right pixel actions on singletons; gives non-associative "handed" algebra (`Lp`, `Rp` operators). Implementable in TypeScript but no clear on-chain primitive yet. |
| §5.5 | Maxel bases and posets | Closure properties of pixel sets; zeta matrix / Möbius inversion. Pure combinatorics — interesting but outside current protocol use cases. |
| §4.1+ | Multinumbers, metanumbers | Higher-depth box nesting. Research territory. |
