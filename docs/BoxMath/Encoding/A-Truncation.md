---
sidebar_position: 8
---

# Addendum: Degree Truncation and the Babylonian Method

This addendum covers degree truncation (`T^k`) and integer square root approximation. These are relevant for advanced use cases — high-degree bonding curves, LP curves, ECDSA-adjacent constructions — where you need a concrete integer approximation of an irrational quantity. For most on-chain invariants the proportion approach from [§2](./2-Incommensurability.md) is sufficient and preferable.

## Degree truncation T^k

Wildberger's `T^k` keeps all polynomial terms with total degree $\leq k$ and discards the rest. In `boxmath`:

```ts
const p = new MultiPoly([
  new Monomial(2n, []),   // degree 0
  new Monomial(3n, [1]),  // degree 1
  new Monomial(1n, [2]),  // degree 2
]);

p.truncate(1);  // keeps degree 0 and 1 only → 2 + 3x
p.truncate(0);  // keeps only the constant → 2
```

`T^1[x^2] = 0` — truncating `x²` to degree 1 leaves the zero polynomial, which has no root. This is the formal sense in which "√2 doesn't exist at degree 1."

## The size preservation law

The justification for treating truncated polynomials as valid arithmetic objects is the **size preservation law** (PDF §3.2, §4.1). Wildberger proves:

$$
s(A + B) = s(A) + s(B) \qquad s(A \times B) = s(A) \times s(B)
$$

This is a **ring homomorphism** — $T^k$ projects a polynomial down to its degree-$\leq k$ shadow while leaving the arithmetic intact. Three corollaries:

1. **Idempotency:** $T^k[T^k[p]] = T^k[p]$
2. **Composition:** $T^k[T^j[p]] = T^{\min(k,j)}[p]$
3. **Closed arithmetic:** degree-$\leq k$ polynomials are closed under $T^k$-truncated multiplication

## Real deployed examples of high-degree polynomials

### Uniswap v3 — TickMath (degree 14)

`TickMath.getSqrtRatioAtTick` approximates $\sqrt{1.0001^{\text{tick}}}$ as a fixed-point rational. The implementation is a hardcoded degree-14 polynomial evaluated via Horner's method — 14 successive multiplications of 128-bit fixed-point values. The coefficients were computed offline by fitting the true function; the degree-14 truncation was chosen to hit the required precision budget within `uint256` bounds.

In box arithmetic terms: the true function $f(\text{tick}) = \sqrt{1.0001^{\text{tick}}}$ has no polynomial form, so Uniswap chose $k = 14$ and deployed $T^{14}[f]$. Every `sqrtPriceX96` in Uniswap v3 is the output of that truncated polynomial.

### Curve stableswap — invariant degree scales with pool size

The Curve stableswap invariant for $n$ assets is:

$$
A \cdot n^n \sum x_i + D = A \cdot D \cdot n^n + \frac{D^{n+1}}{n^n \prod x_i}
$$

Rearranged to solve for $D$, this is a polynomial of degree $n + 1$ in $D$. Curve solves it on-chain via Newton's method (the same Babylonian pattern), iterating until the residual is below 1 wei.

| Pool | Assets ($n$) | Degree of invariant |
|------|-------------|---------------------|
| 3pool (DAI/USDC/USDT) | 3 | 4 |
| 4pool | 4 | 5 |
| metapool (paired with 3pool) | effectively 4 | 5 |

Each Newton step evaluates and differentiates the full degree-$(n+1)$ polynomial. `T^k` is implicit — the iteration stops when `\|D_{i+1} - D_i\| \leq 1`, which is exactly the precision budget at the wei scale.

### Compound interest — exp(x) Taylor series (choose your own k)

Continuous compounding $e^x$ has no finite polynomial — but its Taylor series lets you choose exactly how much degree you need:

$$
e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

At fixed-point scale $S = 10^{18}$ and $x$ small (say, a per-second rate $r \ll 1$), degree 3 or 4 is typically sufficient for DeFi interest accrual:

```ts
// T^4[exp(x)] at fixed-point scale S
// Coefficients: 1, 1, 1/2, 1/6, 1/24 — multiply through by S^4 to clear denominators
// In integer form (scaling managed at call site, not in the polynomial):
const expApprox = new MultiPoly([
  new Monomial(1n,  [0]),  // 1      (degree 0)
  new Monomial(1n,  [1]),  // x      (degree 1)
  new Monomial(1n,  [2]),  // x²/2   — coefficient folded into the evaluation scale
  new Monomial(1n,  [3]),  // x³/6
  new Monomial(1n,  [4]),  // x⁴/24
]);

expApprox.truncate(2);  // drop cubic and quartic — cheaper, less precise
expApprox.truncate(4);  // full approximation
```

The choice of $k$ is the explicit engineering trade-off: more terms = more precision = higher degree = more overflow risk (see table below). `T^k` makes that trade-off a named, auditable parameter rather than a hidden implementation detail.

---

## Security: degree is a security boundary

At wei-scale inputs ($S = 10^{18}$), intermediate values in `evaluate` reach $S^{\text{degree}}$:

| Degree | Max intermediate | `uint256` headroom |
|--------|-----------------|-------------------|
| 1 | $10^{18}$ | safe |
| 2 | $10^{36}$ | safe |
| 3 | $10^{54}$ | safe |
| 4 | $10^{72}$ | approaching limit ($10^{77}$) |
| 5+ | $10^{90}+$ | **overflow** |

A degree-2 invariant (constant product curve) accidentally enforced at degree 1 (a line) is a completely different shape and trivially exploitable. Validate `MultiPoly.terms.map(t => t.degree)` before deployment.
