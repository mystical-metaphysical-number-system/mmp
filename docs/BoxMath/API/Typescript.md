---
sidebar_position: 2
---

# TypeScript API

Import from the `boxmath` package:

```ts
import { Monomial, MultiPoly, pow, caretProduct } from 'boxmath';
```

All values are `bigint` — plain integers, no scaling.

---

## `pow`

```ts
pow(base: bigint, exp: number): bigint
```

Integer exponentiation. `pow(b, 0)` returns `1n`; `pow(b, 1)` returns `b`.

```ts
pow(2n, 10);  // 1024n
pow(3n, 0);   // 1n
```

---

## `caretProduct`

```ts
caretProduct(...boxes: bigint[][]): bigint[]
```

Tensor product of arbitrarily many arrays. Produces every pairwise product across all input arrays — the box `^` operator from §8 of the PDF.

```ts
caretProduct([1n, 2n], [1n, 3n]);
// [1n, 3n, 2n, 6n]  (1×1, 1×3, 2×1, 2×3)

caretProduct([1n, 2n], [1n, 3n], [1n, 5n], [1n, 7n], [1n, 11n]);
// 32 elements — every subset-product of {2, 3, 5, 7, 11}
// includes 1n (empty product) and 2310n (full product)
```

---

## `Monomial`

A single polynomial term: a coefficient and an exponent vector.

```ts
new Monomial(coefficient: bigint, exponents: number[])
```

| Field | Meaning |
|-------|---------|
| `coefficient` | Natural number scalar weight |
| `exponents[i]` | Power of variable $x_i$ |
| `degree` | $\sum_i$ `exponents[i]` |
| `extent` | Index of the last nonzero variable |

### Construction

```ts
const x  = new Monomial(1n, [1]);       // x
const xy = new Monomial(1n, [1, 1]);    // xy
const t  = new Monomial(2n, [2, 0, 1]); // 2x²z
```

### `.evaluate(point)`

$$
\text{evaluate}(c,\,[e_1,\ldots,e_n],\,[a_1,\ldots,a_n]) = c \cdot \prod_i a_i^{e_i}
$$

```ts
new Monomial(1n, [1, 1]).evaluate([10n, 20n]);  // 200n
```

### `.multiply(other)`

Multiplies coefficients and adds exponent vectors — the monomial product rule.

```ts
const x  = new Monomial(1n, [1]);
const y  = new Monomial(1n, [0, 1]);
x.multiply(y);  // Monomial(1n, [1, 1])
```

### `.toString(varNames?)`

```ts
new Monomial(2n, [2, 0, 1]).toString(['x','y','z']);  // "2x^2z"
```

---

## `MultiPoly`

A multiset of monomials — Wildberger's polynumber as a box of terms.

```ts
new MultiPoly(terms: Monomial[])
```

### Static factories

```ts
MultiPoly.linear([2, 3, 5]);   // 2x + 3y + 5z
MultiPoly.constant(42n);       // 42  (degree-zero polynomial)
```

### `.evaluate(point)`

Sums each term evaluated at `point`.

```ts
const k = new MultiPoly([new Monomial(1n, [1, 1])]);
k.evaluate([100n, 200n]);  // 20000n
```

### `.add(other)`

Concatenates term lists — box union with multiplicity. Does **not** collapse like terms.

```ts
const p = MultiPoly.linear([2, 0]);   // 2x
const q = MultiPoly.linear([0, 3]);   // 3y
p.add(q).evaluate([1n, 1n]);          // 5n
```

### `.multiply(other)`

Pairwise monomial product across both term lists — the Cauchy / box product.

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

### `.truncate(k)`

Drops all terms with `degree > k`.

```ts
const p = new MultiPoly([
  new Monomial(2n, []),
  new Monomial(3n, [1]),
  new Monomial(1n, [2]),  // degree 2 — dropped
]);
p.truncate(1).evaluate([5n]);  // 17n  (2 + 3·5)
```

### `.toString(varNames?)`

```ts
MultiPoly.linear([2, 3, 5]).toString(['x','y','z']);
// "2x + 3y + 5z"
```
