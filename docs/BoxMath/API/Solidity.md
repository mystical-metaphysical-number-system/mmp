---
sidebar_position: 3
---

# Solidity API

Two contracts ship in `hardhat/contracts/`:

| Contract | Primitives |
|----------|-----------|
| `BoxMath.sol` | `Monomial`, `MultiPoly`, polynomial evaluation, truncation, caret product |
| `PixelMath.sol` | `Pixel`, vexel operations, Pythagorean triple generation |

---

# BoxMath.sol

Contract: `hardhat/contracts/BoxMath.sol`

All arithmetic is **exact integer** (`uint256`) — no fixed-point scaling, no `SCALE` constant. Values passed in and returned are raw natural numbers, matching the TypeScript `bigint` API exactly.

---

## Structs

```solidity
struct Monomial {
    uint256 coefficient;
    uint256[] exponents;
}

struct MultiPoly {
    Monomial[] terms;
}
```

---

## `pow`

```solidity
function pow(uint256 base, uint256 exp) public pure returns (uint256)
```

Integer exponentiation. `pow(b, 0)` returns `1`; `pow(b, 1)` returns `b`.

```solidity
boxMath.pow(2, 10);  // 1024
boxMath.pow(3, 0);   // 1
```

---

## `caretProduct`

```solidity
function caretProduct(uint256[][] memory boxes) public pure returns (uint256[] memory)
```

Tensor product of an array of arrays. Equivalent to `caretProduct(...boxes)` in TypeScript.

```ts
const M = await boxMath.caretProduct([
  [1n, 2n], [1n, 3n], [1n, 5n], [1n, 7n], [1n, 11n]
]);
// M.length === 32  (2^5 elements)
// M includes 2310n (2·3·5·7·11) and 1n (empty product)
```

---

## `monomialDegree`

```solidity
function monomialDegree(Monomial memory m) public pure returns (uint256)
```

Sum of all exponents — $\sum_i e_i$.

```ts
await boxMath.monomialDegree({ coefficient: 1n, exponents: [1n, 1n] });  // 2n
```

---

## `evaluateMonomial`

```solidity
function evaluateMonomial(Monomial memory m, uint256[] memory point)
    public pure returns (uint256)
```

Evaluates $c \cdot \prod_i p_i^{e_i}$.

```ts
await boxMath.evaluateMonomial(
  { coefficient: 1n, exponents: [1n, 1n] },
  [10n, 20n]
);  // 200n
```

---

## `multiplyMonomials`

```solidity
function multiplyMonomials(Monomial memory a, Monomial memory b)
    public pure returns (Monomial memory)
```

Multiplies coefficients and adds exponent vectors.

```ts
const x = { coefficient: 1n, exponents: [1n] };
const y = { coefficient: 1n, exponents: [0n, 1n] };
const [coeff, exps] = await boxMath.multiplyMonomials(x, y);
// coeff === 1n, exps === [1n, 1n]
```

---

## `evaluateMultiPoly`

```solidity
function evaluateMultiPoly(MultiPoly memory p, uint256[] memory point)
    public pure returns (uint256)
```

Sums each term evaluated at `point`.

```ts
const k = { terms: [{ coefficient: 1n, exponents: [1n, 1n] }] };
await boxMath.evaluateMultiPoly(k, [100n, 200n]);  // 20000n
```

---

## `addMultiPoly`

```solidity
function addMultiPoly(MultiPoly memory a, MultiPoly memory b)
    public pure returns (MultiPoly memory)
```

Concatenates term lists — box union with multiplicity.

---

## `multiplyMultiPoly`

```solidity
function multiplyMultiPoly(MultiPoly memory a, MultiPoly memory b)
    public pure returns (MultiPoly memory)
```

Pairwise monomial product across both term lists — the Cauchy / box product.

```ts
const product = await boxMath.multiplyMultiPoly(B, C);
product.terms.length;  // 6  (3 × 2 pairs)
```

---

## `truncate`

```solidity
function truncate(MultiPoly memory p, uint256 k)
    public pure returns (MultiPoly memory)
```

Drops all terms with `degree > k`.

:::caution Explicit ABI decoding required

ethers v6 has a known bug where decoding single-element `uint256[]` arrays inside nested struct return values throws `TypeError: Cannot assign to read only property '0'`. Any function that returns `Monomial` or `MultiPoly` must be called via `provider.call` and decoded with `AbiCoder.defaultAbiCoder()` using **unnamed** tuple type strings:

```ts
const coder = ethers.AbiCoder.defaultAbiCoder();
const addr  = await boxMath.getAddress();

const calldata = boxMath.interface.encodeFunctionData("truncate", [p, 1n]);
const raw      = await ethers.provider.call({ to: addr, data: calldata });

const [[terms]] = coder.decode(["((uint256,uint256[])[])"], raw);
// terms is a plain array — no named-property assignment attempted
```

Passing unnamed types (`(uint256,uint256[])` instead of `(uint256 coefficient,uint256[] exponents)`) suppresses the named-key assignment path in ethers that triggers the bug.
:::

```ts
const p = {
  terms: [
    { coefficient: 2n, exponents: [0n, 0n] },
    { coefficient: 3n, exponents: [1n, 0n] },
    { coefficient: 1n, exponents: [2n, 0n] },  // degree 2 — dropped
  ],
};
// use explicit decode pattern above
// terms.length === 2
// evaluateMultiPoly(truncated, [5n]) === 17n  (2 + 3·5)
```

---

# PixelMath.sol

Contract: `hardhat/contracts/PixelMath.sol`

All arithmetic is exact `uint256` — no division, no fixed-point scaling.

---

## Struct

```solidity
struct Pixel {
    uint256 m;
    uint256 n;
}
```

A pixel $[m, n]$ is a 2-listbox of natural numbers. Think of it as a matrix index pair: `m` is the row, `n` is the column.

---

## `pixelProduct`

```solidity
function pixelProduct(Pixel memory a, Pixel memory b)
    public pure returns (bool ok, Pixel memory result)
```

The **pixel product** (Definition 11): $[m,n] \cdot [p,q] = [m,q]$ when $n = p$; otherwise `ok = false` and the result is nothing (represented as `(0,0)`).

```ts
await pm.pixelProduct({ m: 3n, n: 4n }, { m: 4n, n: 11n });
// ok = true,  result = { m: 3n, n: 11n }

await pm.pixelProduct({ m: 3n, n: 4n }, { m: 5n, n: 11n });
// ok = false  (4 ≠ 5 — nothing)
```

:::note ethers v6 struct re-use
When passing a pixel returned by one call into a subsequent call, reconstruct a plain object first:

```ts
const [, rawAB] = await pm.pixelProduct(a, b);
const ab = { m: rawAB.m, n: rawAB.n };   // plain object — not ethers Result
const [ok, result] = await pm.pixelProduct(ab, c);
```
:::

---

## `pixelTranspose`

```solidity
function pixelTranspose(Pixel memory p) public pure returns (Pixel memory)
```

$[m,n]^T = [n,m]$. Satisfies $(ab)^T = b^T a^T$.

---

## `pixelIsDiagonal`

```solidity
function pixelIsDiagonal(Pixel memory p) public pure returns (bool)
```

Returns `true` when `m == n`.

---

## `pythagoreanTriple`

```solidity
function pythagoreanTriple(Pixel memory p)
    public pure returns (bool ok, uint256 a, uint256 b, uint256 c)
```

For pixel $[m, n]$ with $m > n > 0$, returns the Pythagorean triple $(m^2-n^2,\; 2mn,\; m^2+n^2)$. Returns `ok = false` when the precondition is not met.

```ts
await pm.pythagoreanTriple({ m: 2n, n: 1n });  // ok=true,  3n, 4n,  5n
await pm.pythagoreanTriple({ m: 3n, n: 2n });  // ok=true,  5n, 12n, 13n
await pm.pythagoreanTriple({ m: 4n, n: 3n });  // ok=true,  7n, 24n, 25n
```

---

## Maxel operations

A maxel is represented as `MaxelEntry[]` — a sparse list of `(Pixel, uint256)` pairs.

```solidity
struct MaxelEntry {
    Pixel pixel;
    uint256 coeff;
}
```

### `maxelTranspose`

```solidity
function maxelTranspose(MaxelEntry[] memory M)
    public pure returns (MaxelEntry[] memory)
```

Transposes every pixel in the list.

### `maxelProduct`

```solidity
function maxelProduct(MaxelEntry[] memory M, MaxelEntry[] memory N)
    public pure returns (MaxelEntry[] memory)
```

Computes $MN = \{ pq : p \in M,\, q \in N \}$. Pixel products that are nothing are dropped; coefficients of identical result pixels are merged by summation.

```ts
// Example 22
const M = [
  { pixel: { m: 0n, n: 0n }, coeff: 1n },
  { pixel: { m: 1n, n: 0n }, coeff: 1n },
];
const N = [
  { pixel: { m: 1n, n: 0n }, coeff: 1n },
  { pixel: { m: 0n, n: 2n }, coeff: 1n },
  { pixel: { m: 2n, n: 3n }, coeff: 1n },
];
const MN = await pm.maxelProduct(M, N);
// MN = [{ pixel: [0,2], coeff: 1 }, { pixel: [1,2], coeff: 1 }]
```

---

## Vexel operations

Vexels are represented as plain `uint256[]` — a dense coefficient vector where index `i` holds the coefficient for singleton `[i]`.

### `vexelAdd`

```solidity
function vexelAdd(uint256[] memory u, uint256[] memory v)
    public pure returns (uint256[] memory)
```

Element-wise addition; pads the shorter vector with zeros.

```ts
await pm.vexelAdd([1n, 2n, 0n], [0n, 3n, 4n]);  // [1n, 5n, 4n]
await pm.vexelAdd([1n, 2n],     [0n, 3n, 4n]);  // [1n, 5n, 4n]
```

### `vexelScale`

```solidity
function vexelScale(uint256[] memory u, uint256 scalar)
    public pure returns (uint256[] memory)
```

```ts
await pm.vexelScale([1n, 2n, 3n], 3n);  // [3n, 6n, 9n]
```

### `vexelDot`

```solidity
function vexelDot(uint256[] memory u, uint256[] memory v)
    public pure returns (uint256 sum)
```

Inner product over the shorter length.

```ts
await pm.vexelDot([1n, 2n, 3n], [4n, 5n, 6n]);  // 32n  (1·4 + 2·5 + 3·6)
```
