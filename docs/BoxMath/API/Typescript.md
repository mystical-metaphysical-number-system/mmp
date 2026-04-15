---
sidebar_position: 2
---

# TypeScript API

Import from the `boxmath` package:

```ts
import { Monomial, MultiPoly, pow, caretProduct, Pixel, Vexel, Maxel } from 'boxmath';
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

---

## `Pixel`

A **2-listbox** of natural numbers — an ordered pair $[m, n]$ in box form:

$$
[m, n] \;=\; \{m\},\, \{m, n\} \;=\; e_m + e_m e_n
$$

Pixels support a **non-commutative associative multiplication** that mirrors matrix index composition: $[m,n] \cdot [n,q] = [m,q]$, and the product is `null` when the inner indices don't match.

```ts
new Pixel(m: bigint, n: bigint)
```

### `.pixelProduct(other)`

The **pixel product** from Definition 11 of the paper — a non-commutative, partial operation distinct from ordinary multiplication:

```ts
new Pixel(3n, 4n).pixelProduct(new Pixel(4n, 11n));  // Pixel(3n, 11n)
new Pixel(3n, 4n).pixelProduct(new Pixel(5n, 11n));  // null  (4 ≠ 5, nothing)
```

The result is **nothing** (not zero — nothing) when the inner indices don't match. The product is **associative** but not commutative: `(a·b)·c === a·(b·c)` whenever either side is non-null.

### `.transpose`

```ts
new Pixel(3n, 7n).transpose;  // Pixel(7n, 3n)
```

Satisfies $(ab)^T = b^T a^T$.

### `.isDiagonal`

```ts
new Pixel(3n, 3n).isDiagonal;  // true
new Pixel(3n, 4n).isDiagonal;  // false
```

### `.pythagoreanTriple()`

For a pixel $[m, n]$ with $m > n > 0$, returns the Babylonian / Pythagorean triple:

$$
(m^2 - n^2,\; 2mn,\; m^2 + n^2)
$$

```ts
new Pixel(2n, 1n).pythagoreanTriple();  // [3n, 4n, 5n]
new Pixel(3n, 2n).pythagoreanTriple();  // [5n, 12n, 13n]
new Pixel(4n, 3n).pythagoreanTriple();  // [7n, 24n, 25n]
```

Returns `null` when $m \leq n$ or $n = 0$. All arithmetic is exact integer — no division, no square roots.

---

## `Vexel`

A **box of singletons** with natural-number coefficients — a coefficient vector over singleton indices:

$$
v = c_0 [0] + c_1 [1] + \cdots + c_n [n]
$$

Represented as a sparse `Map<bigint, bigint>` (index → coefficient). Zero entries are absent.

```ts
new Vexel(entries?: Iterable<[bigint, bigint]>)
Vexel.fromArray(arr: bigint[]): Vexel
```

### `.add(other)`

```ts
const v1 = Vexel.fromArray([1n, 2n, 0n]);
const v2 = Vexel.fromArray([0n, 3n, 4n]);
v1.add(v2).toArray(3);  // [1n, 5n, 4n]
```

### `.scale(scalar)`

```ts
Vexel.fromArray([1n, 2n, 3n]).scale(3n).toArray(3);  // [3n, 6n, 9n]
```

### `.dot(other)`

Inner product over shared indices:

```ts
Vexel.fromArray([1n, 2n, 3n]).dot(Vexel.fromArray([4n, 5n, 6n]));
// 1·4 + 2·5 + 3·6 = 32n
```

### `.get(idx)` / `.support` / `.toArray(n)`

```ts
const v = Vexel.fromArray([2n, 0n, 5n]);
v.get(2n);        // 5n
v.support;        // [0n, 2n]  — indices with nonzero coefficient
v.toArray(3);     // [2n, 0n, 5n]
```

---

## `Maxel`

A **box of pixels** with natural-number coefficients — the Box Arithmetic representation of a matrix:

$$
M = \sum_{i,j} c_{ij} \cdot [i, j]
$$

```ts
new Maxel(entries?: Iterable<[Pixel, bigint]>)
Maxel.fromPixels(pixels: Pixel[]): Maxel
```

Implemented as a sparse `Map<string, bigint>` (pixel key `"m,n"` → coefficient). Zero-coefficient entries are absent.

### `.get(m, n)`

```ts
const M = new Maxel([
  [new Pixel(0n, 0n), 2n],
  [new Pixel(1n, 0n), 1n],
  [new Pixel(0n, 2n), 3n],
]);
M.get(0n, 0n);  // 2n
M.get(9n, 9n);  // 0n
```

### `.transpose`

Transposes every pixel in the box: $M^T = \{ p^T : p \in M \}$

```ts
// M = 2[0,0] + [1,0] + 3[0,2]
M.transpose;
// 2[0,0] + [0,1] + 3[2,0]   ([1,0]^T = [0,1], [0,2]^T = [2,0])
```

### `.add(other)`

Box union with multiplicity — merges coefficient maps.

### `.maxelProduct(other)`

The **maxel product** $MN = \{ pq : p \in M,\, q \in N \}$:
- Pixel products that are nothing are dropped
- Coefficients of identical result pixels are summed
- Reproduces matrix multiplication over natural numbers

```ts
// Example 22 from the paper
const M = Maxel.fromPixels([new Pixel(0n, 0n), new Pixel(1n, 0n)]);
const N = Maxel.fromPixels([new Pixel(1n, 0n), new Pixel(0n, 2n), new Pixel(2n, 3n)]);
const MN = M.maxelProduct(N);
MN.get(0n, 2n);  // 1n
MN.get(1n, 2n);  // 1n

// Example 23 from the paper  (M = 2[0,0] + [1,0] + 3[0,2])
const N2 = new Maxel([
  [new Pixel(1n, 0n), 1n], [new Pixel(0n, 1n), 4n],
  [new Pixel(2n, 1n), 7n], [new Pixel(3n, 2n), 5n],
]);
M18.maxelProduct(N2).get(0n, 1n);  // 29n
M18.maxelProduct(N2).get(1n, 1n);  // 4n
```

### `.toMatrix(rows, cols)`

Dense 2-D `bigint[][]` representation:

```ts
M.toMatrix(2, 3);
// [ [2n, 0n, 3n],
//   [1n, 0n, 0n] ]
```
