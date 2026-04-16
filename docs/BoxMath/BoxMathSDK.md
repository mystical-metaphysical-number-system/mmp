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
import { Polynumber, Multinumber } from 'boxmath';

const f = new Multinumber([
  new Polynumber(2n, [1]),
  new Polynumber(3n, [0, 1]),
  new Polynumber(5n, [0, 0, 1]),
]);

f.evaluate([1n, 2n, 3n]);  // 2·1 + 3·2 + 5·3 = 23n
```

The identity $n^0 = 1$ falls out structurally: the empty exponent vector contributes a multiplicative identity, and `pow(n, 0)` returns `1n` by definition.

---

## Polynumber — A Single Box Term

In Wildberger's hierarchy (`Nat ⊂ Poly ⊂ Multi`), a **polynumber** is a single box element — a coefficient paired with a sparse exponent vector encoding which variables appear and at what power.

```
Polynumber(coefficient: bigint, exponents: number[])
```

| Field | Box arithmetic meaning |
|-------|----------------------|
| `coefficient` | Natural number scalar weight of this term |
| `exponents[i]` | Power of variable $x_i$ in this term |
| `degree` | $\sum_i$ `exponents[i]` — total degree |
| `extent` | Index of the last nonzero variable |

### Construction

```ts
import { Polynumber } from 'boxmath';

const x    = new Polynumber(1n, [1]);       // x
const xy   = new Polynumber(1n, [1, 1]);    // xy
const term = new Polynumber(2n, [2, 0, 1]); // 2x²z
```

### Evaluation

`polynumber.evaluate(point)` substitutes values into the term:

$$
\text{evaluate}(c,\, [e_1,\ldots,e_n],\, [a_1,\ldots,a_n]) = c \cdot \prod_i a_i^{e_i}
$$

```ts
const xy = new Polynumber(1n, [1, 1]);
xy.evaluate([100n, 200n]);  // 1 · 100 · 200 = 20000n
```

### Multiplication

`polynumber.multiply(other)` adds exponent vectors and multiplies coefficients — placing two box elements side by side under the caret `^` operator:

```ts
const x  = new Polynumber(1n, [1]);
const y  = new Polynumber(1n, [0, 1]);
const xy = x.multiply(y);  // Polynumber(1n, [1, 1])
```

---

## Multinumber — A Box of Polynumbers

A `Multinumber` is a **multiset of polynumbers** — a box whose elements are polynomial terms. This sits at the `Multi` level of Wildberger's hierarchy: a box of Poly-level elements.

$$
p = \langle m_1,\, m_2,\, \ldots,\, m_k \rangle
$$

where each $m_i$ is a `Polynumber`. Repetition is allowed; order does not matter.

```ts
import { Multinumber, Polynumber } from 'boxmath';

// p(x, y) = xy
const p = new Multinumber([new Polynumber(1n, [1, 1])]);
```

### Factory helpers

`Multinumber.linear(coeffs)` builds $\sum_i c_i x_i$:

```ts
const f = Multinumber.linear([2, 3, 5]);
f.evaluate([1n, 2n, 3n]);  // 23n
```

`Multinumber.constant(value)` wraps a scalar as a degree-zero term:

```ts
const k = Multinumber.constant(42n);
```

### Addition — Box Union

`p.add(q)` concatenates term lists. This is **box union with multiplicity**:

$$
\langle m_1, m_2 \rangle + \langle m_3 \rangle = \langle m_1, m_2, m_3 \rangle
$$

```ts
const px = new Multinumber([new Polynumber(2n, [1])]);    // 2x
const py = new Multinumber([new Polynumber(3n, [0, 1])]); // 3y
const sum = px.add(py);  // 2x + 3y
```

### Multiplication — Cartesian Product

`p.multiply(q)` computes every pairwise `polynumber.multiply` between the two term lists — the **box product**:

$$
A \times B = \{ a \cdot b \mid a \in A,\, b \in B \}
$$

```ts
const B = new Multinumber([
  new Polynumber(1n, []),
  new Polynumber(1n, [0,0,0,1]),
  new Polynumber(1n, [0,0,1,0,1]),
]);
const C = new Multinumber([
  new Polynumber(1n, [0,2]),
  new Polynumber(1n, [0,0,1,0,1]),
]);
B.multiply(C).terms.length;  // 6  (3 × 2 pairs)
```

### Truncation

`p.truncate(k)` drops all terms with `degree > k`:

```ts
const p = new Multinumber([
  new Polynumber(2n, []),
  new Polynumber(3n, [1]),
  new Polynumber(1n, [2]),  // dropped
]);
p.truncate(1).evaluate([5n]);  // 17n  (2 + 3·5)
```

---

## BoxMath.sol — The On-Chain Mirror

The Solidity contract exposes the same primitives as the TypeScript package. Both use exact `uint256` / `bigint` integer arithmetic — no `SCALE`, no fixed-point division. See the [Solidity API reference](./API/Solidity) for the full function list and the ethers v6 decoding caveat for struct-returning functions.

```solidity
contract BoxMath {
    struct Polynumber  { uint256 coefficient; uint256[] exponents; }
    struct Multinumber { Polynumber[] terms; }

    function pow(uint256 base, uint256 exp) public pure returns (uint256);
    function caretProduct(uint256[][] memory boxes) public pure returns (uint256[] memory);
    function evaluatePolynumber(Polynumber memory m, uint256[] memory point) public pure returns (uint256);
    function multiplyPolynumbers(Polynumber memory a, Polynumber memory b) public pure returns (Polynumber memory);
    function evaluateMultinumber(Multinumber memory p, uint256[] memory point) public pure returns (uint256);
    function addMultinumber(Multinumber memory a, Multinumber memory b) public pure returns (Multinumber memory);
    function multiplyMultinumber(Multinumber memory a, Multinumber memory b) public pure returns (Multinumber memory);
    function truncate(Multinumber memory p, uint256 k) public pure returns (Multinumber memory);
    function polynumberDegree(Polynumber memory m) public pure returns (uint256);
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
| Polynumber (single box term) | `Polynumber(coeff, exponents)` |
| Multinumber (box of polynumbers) | `Multinumber` — list of polynumber terms |
| Box addition (multiset union) | `Multinumber.add` / `addMultinumber` |
| Box multiplication (Cauchy product) | `Multinumber.multiply` / `multiplyMultinumber` |
| Power $n^k$ | `pow(n, k)` |
| Evaluation $p(A)$ | `Multinumber.evaluate` / `evaluateMultinumber` |
| Truncation to degree $k$ | `Multinumber.truncate` / `truncate` |
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
