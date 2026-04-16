---
sidebar_position: 10
---

# 10. Linear Algebra Primitives: Pixels, Vexels, Maxels

The polynumber layer of box arithmetic — `Polynumber`, `Multinumber`, degree truncation — gives us a powerful tool for encoding scalar invariants. But DeFi protocols do not operate on scalars alone. A portfolio is a vector of balances. A swap is a linear map between token spaces. A routing graph is a directed structure over token indices. These are linear-algebraic objects, and box arithmetic has a natural foundation for them that requires no fractions, no floating point, and no division.

The three primitives are **Pixel**, **Vexel**, and **Maxel** — defined in §5 of Wildberger's *Box Arithmetic Overview*.

---

## From multisets to ordered lists

Every primitive introduced so far — natural numbers, polynumbers, multinumbers — is an **unordered** box. The empty box $0$ is the atom; $\{0, 0\}$ is the same box as $\{0, 0\}$, order irrelevant. This is the right foundation for polynomial algebra, where $xy = yx$.

To encode vectors and matrices we need **ordered** data. The solution is the **listbox**: an encoding of order inside the unordered box world.

A **listbox** $[A_1, A_2, \ldots, A_n]$ is not a flat sequence — it is a box of prefix sets:

$$
[A_1, A_2, \ldots, A_n] = \bigl\{ \{A_1\},\; \{A_1, A_2\},\; \ldots,\; \{A_1, A_2, \ldots, A_n\} \bigr\}
$$

The order is recovered from subset containment: $\{A_1\} \subset \{A_1, A_2\} \subset \cdots$. Each entry is uniquely determined by Proposition 5 in the paper. This construction is the bridge from the unordered box world into ordered, positional data.

---

## Singleton: a 1-listbox

A **singleton** $[n]$ is the simplest listbox — a single natural number in listbox form. As a box it is $\{\{n\}\} = e_n$, the $n$-th base multinumber. Singletons are the natural basis for vector indices.

---

## Pixel: a 2-listbox

A **pixel** $[m, n]$ is a 2-listbox of natural numbers. In box form:

$$
[m, n] = \bigl\{ \{m\},\; \{m, n\} \bigr\} = e_m + e_m e_n
$$

Think of $[m, n]$ as a **matrix index pair**: row $m$, column $n$.

Pixels support a non-commutative, partial multiplication — the **pixel product** (Definition 11):

$$
[m, n] \cdot [p, q] = \begin{cases} [m, q] & \text{if } n = p \\ \text{nothing} & \text{otherwise} \end{cases}
$$

The result is not zero — it is **nothing**: no output is produced at all. Wildberger compares it to particle-antiparticle annihilation in physics. In code, `pixelProduct` returns `null` / `(false, _)`.

This operation is **associative** but not commutative. It mirrors matrix index composition exactly: $[m,n] \cdot [n,q]$ chains row $m$ through column $n$ to column $q$, just as multiplying matrix entries $A_{mn} \cdot B_{nq}$ contributes to $C_{mq}$.

```ts
import { Pixel } from 'boxmath';

new Pixel(3n, 4n).pixelProduct(new Pixel(4n, 11n));  // Pixel(3n, 11n)
new Pixel(3n, 4n).pixelProduct(new Pixel(5n, 11n));  // null — nothing
```

### Transpose

$$
[m, n]^T = [n, m] \qquad (ab)^T = b^T a^T
$$

```ts
new Pixel(3n, 7n).transpose;  // Pixel(7n, 3n)
```

### Pythagorean triples

The pixel algebra has a striking classical connection. For a pixel $[m, n]$ with $m > n > 0$:

$$
(m^2 - n^2)^2 + (2mn)^2 = (m^2 + n^2)^2
$$

The triple $(m^2 - n^2,\; 2mn,\; m^2 + n^2)$ is a Pythagorean triple. Every primitive Pythagorean triple arises from exactly one such pixel. The ancient Babylonian tablet MS3971 lists Pythagorean triples parametrised by exactly this formula — a connection between Box Arithmetic's ordered pairs and a 4000-year-old mathematical tradition, all without fractions or square roots.

```ts
new Pixel(2n, 1n).pythagoreanTriple();  // [3n, 4n, 5n]
new Pixel(3n, 2n).pythagoreanTriple();  // [5n, 12n, 13n]
new Pixel(4n, 3n).pythagoreanTriple();  // [7n, 24n, 25n]
```

---

## Vexel: a box of singletons

A **vexel** is a box of singletons with natural-number coefficients:

$$
v = c_0 [0] + c_1 [1] + \cdots + c_n [n]
$$

This is a coefficient vector over the singleton basis — the Box Arithmetic equivalent of a vector in $\mathbb{N}^n$. All operations are exact integer arithmetic.

```ts
import { Vexel } from 'boxmath';

const v1 = Vexel.fromArray([1n, 2n, 3n]);
const v2 = Vexel.fromArray([4n, 5n, 6n]);

v1.add(v2).toArray(3);      // [5n, 7n, 9n]
v1.dot(v2);                 // 32n  (1·4 + 2·5 + 3·6)
v1.scale(3n).toArray(3);    // [3n, 6n, 9n]
```

A vexel of token balances $(c_{\text{USDC}},\; c_{\text{ETH}},\; c_{\text{BTC}})$ is the natural representation of a multi-asset portfolio — no scaling factors, no decimal conversions between assets.

---

## Maxel: a box of pixels

A **maxel** is a box of pixels with natural-number coefficients — a sparse matrix over $\mathbb{N}$:

$$
M = \sum_{i,j} c_{ij} \cdot [i, j]
$$

The **maxel product** $MN$ is the box of all pixel products between elements of $M$ and $N$:
- Pixel products that are nothing are dropped
- Coefficients of identical result pixels are summed

This is exactly **matrix multiplication over $\mathbb{N}$** — but derived from the pixel product, not postulated as an axiom.

```ts
import { Pixel, Maxel } from 'boxmath';

// From §5.3, Example 23 of the paper:
// M = 2[0,0] + [1,0] + 3[0,2]
// N = [1,0] + 4[0,1] + 7[2,1] + 5[3,2]
// MN = 29[0,1] + 4[1,1]

const M = new Maxel([
  [new Pixel(0n, 0n), 2n],
  [new Pixel(1n, 0n), 1n],
  [new Pixel(0n, 2n), 3n],
]);
const N = new Maxel([
  [new Pixel(1n, 0n), 1n],
  [new Pixel(0n, 1n), 4n],
  [new Pixel(2n, 1n), 7n],
  [new Pixel(3n, 2n), 5n],
]);

M.maxelProduct(N).get(0n, 1n);  // 29n
M.maxelProduct(N).get(1n, 1n);  // 4n
```

### Transpose

The transpose of a maxel is the box of transposes of its pixels:

$$
M^T = \{ p^T : p \in M \}
$$

This maps directly to the usual matrix transpose: entry $(i,j)$ of $M$ becomes entry $(j,i)$ of $M^T$.

---

## Solidity equivalents

All three primitives have isomorphic Solidity implementations in `PixelMath.sol`:

```solidity
struct Pixel     { uint256 m; uint256 n; }
struct MaxelEntry { Pixel pixel; uint256 coeff; }

// Pixel
function pixelProduct(Pixel memory a, Pixel memory b)
    public pure returns (bool ok, Pixel memory result);
function pixelTranspose(Pixel memory p) public pure returns (Pixel memory);
function pythagoreanTriple(Pixel memory p)
    public pure returns (bool ok, uint256 a, uint256 b, uint256 c);

// Vexel (dense uint256[])
function vexelAdd(uint256[] memory u, uint256[] memory v) public pure returns (uint256[] memory);
function vexelDot(uint256[] memory u, uint256[] memory v) public pure returns (uint256);
function vexelScale(uint256[] memory u, uint256 scalar) public pure returns (uint256[] memory);

// Maxel (sparse MaxelEntry[])
function maxelProduct(MaxelEntry[] memory M, MaxelEntry[] memory N)
    public pure returns (MaxelEntry[] memory);
function maxelTranspose(MaxelEntry[] memory M) public pure returns (MaxelEntry[] memory);
```

The next section shows these primitives applied to a concrete protocol problem: multi-hop swap routing.

---

## Out of scope for v0: the handed algebra

Sections 5.4–5.5 of the paper describe a richer algebraic structure that emerges when maxels act on vexels. At the pixel level, a singleton can be hit from the left or right by a pixel:

$$
[5,4] \cdot [4] = [5] \qquad [4] \cdot [4,5] = [5]
$$

This gives rise to distinct **left** and **right** multiplication operators ($L_p$, $R_p$) that compose in a non-associative way — a "handed" algebra. Section 5.5 then connects maxel bases to partially ordered sets and Möbius inversion.

Both threads are mathematically deep and implementable, but have no clear protocol primitive yet. They are left as future work. The current `Vexel` and `Maxel` implementations cover the linear-algebraic layer (vectors, matrices, dot products, matrix multiplication) without requiring the handed structure.
