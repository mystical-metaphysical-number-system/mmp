---
sidebar_position: 3
---

# Solidity API

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
