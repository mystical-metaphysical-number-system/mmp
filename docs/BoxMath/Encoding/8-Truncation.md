---
sidebar_position: 8
---

# 8. Degree Truncation and Composability

SafeMath, PRBMath, and Q-number libraries each solve a real problem. SafeMath prevents integer overflow. PRBMath provides high-precision fixed-point arithmetic within a single protocol. Q-numbers give you a consistent decimal convention. None of them address what happens at the boundary *between* protocols — and that boundary is where the most damaging exploits live.

The canonical example: USDC uses 6 decimal places, DAI uses 18. A multicall that routes through both can accumulate rounding errors at each decimal-boundary crossing. Each individual operation is safe and precise in isolation; the exploit lives in the composition. The attacker calls the sequence enough times to extract the accumulated dust. SafeMath never fires — no single step overflows. Q-numbers never fire — each protocol is internally consistent. The inhomogeneity between the two number fields is invisible to both.

Box arithmetic addresses this structurally. Degree truncation (`T^k`) is the operation that keeps all polynomial terms with total degree $\leq k$ and discards the rest. In isolation it is a precision tool. At a protocol boundary it is a **field homogeneity check** — the degree of a polynomial is a structural invariant that can be asserted at the boundary before a value is accepted. A caller cannot smuggle a degree-4 computation through a degree-2 boundary; the check is on the shape of the arithmetic, not just its output.

---

## T^k as a named trade-off

```ts
p.truncate(k)  // keep terms with degree ≤ k
```

`T^1[x^2] = 0` — the zero polynomial. This is the formal sense in which "√2 doesn't exist at degree 1": no degree-1 polynomial has a root at 2. The truncation does not approximate the answer; it refuses the question.

The ring homomorphism property (Wildberger §3.2):

$$
T^k[A + B] = T^k[A] + T^k[B] \qquad T^k[A \times B] = T^k[A \times B]
$$

Two corollaries that matter for composition:

1. **Composition:** $T^k[T^j[p]] = T^{\min(k,j)}[p]$ — the tighter bound wins, always.
2. **Closed arithmetic:** degree-$\leq k$ polynomials are closed under $T^k$-truncated multiplication — the degree cannot escape.

---

## Truncation by example
```ts
// p = 2 + 2x + x^2
const p = new MultiPoly([
  new Monomial(2n, []),   // 2        ≡  degree 0
  new Monomial(3n, [1]),  // 3x       ≡  degree 1
  new Monomial(1n, [2]),  // x²       ≡  degree 2
]);

p.truncate(1);  // 2 + 3x   — drops x²
p.truncate(0);  // 2        — keeps only the constant
```

`T^1[x^2] = 0` — the zero polynomial. This is the formal sense in which "√2 doesn't exist at degree 1": no degree-1 polynomial has a root at 2. The truncation does not approximate the answer; it refuses the question.

---

## Example 1 — Compound interest: T^k[exp(x)]

Continuous compounding $e^x$ has no finite polynomial. Its Taylor series lets you choose your precision:

$$
e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
$$

For on-chain interest accrual, $x$ is a small per-second rate, and degree 4 is typically sufficient. To stay in integer arithmetic, multiply each coefficient through by the common denominator (here $4! = 24$) and carry the scale as a known constant:

```ts
import { Monomial, MultiPoly } from 'boxmath';

// 24·e^x ≈ 24 + 24x + 12x² + 4x³ + x⁴    (coefficients × 4!)
const expSeries = new MultiPoly([
  new Monomial(24n, [0]),  // 24        ≡  24·(1)
  new Monomial(24n, [1]),  // 24x       ≡  24·(x/1!)
  new Monomial(12n, [2]),  // 12x²      ≡  24·(x²/2!)
  new Monomial( 4n, [3]),  //  4x³      ≡  24·(x³/3!)
  new Monomial( 1n, [4]),  //   x⁴      ≡  24·(x⁴/4!)
]);

// rate = 1/1000 per second → x = 1, denominator = 1000
const x = 1n;
expSeries.evaluate([x]);            // 65n  (= 24·e^(1/1000) × 1000, scaled)

const cheapApprox  = expSeries.truncate(2);  // drop cubic + quartic — cheaper, less accurate
const fullApprox   = expSeries.truncate(4);  // full 4-term approximation

cheapApprox.evaluate([x]);   // 60n  (24 + 24 + 12)
fullApprox.evaluate([x]);    // 65n  (24 + 24 + 12 + 4 + 1)
```

The degree `k` is an explicit engineering dial. Raising `k` costs gas and overflow headroom; lowering it introduces a named approximation error with a known residual bound. Neither choice is hidden.

---

## Example 2 — High-degree bonding curve

A bonding curve that charges progressively more for later tokens might use a cubic price function $p(s) = a + bs + cs^2$ where $s$ is supply. The integral — total cost to buy from $s_0$ to $s_1$ — is a degree-4 polynomial:

$$
\text{cost}(s_0, s_1) = \int_{s_0}^{s_1} (a + bs + cs^2)\, ds = a(s_1 - s_0) + \frac{b}{2}(s_1^2 - s_0^2) + \frac{c}{3}(s_1^3 - s_0^3)
$$

In box arithmetic, you build the full degree-4 cost polynomial and truncate to whatever precision your `uint256` budget allows:

```ts
// cost polynomial in two variables s₀, s₁ — integer coefficients, denominators cleared (×6)
// 6·cost = 6a(s₁-s₀) + 3b(s₁²-s₀²) + 2c(s₁³-s₀³)
const costPoly = new MultiPoly([
  new Monomial(6n,  [0, 1]),  //  6s₁      ≡  6a·s₁         (a=1, linear term)
  new Monomial(6n,  [1, 0]),  //  6s₀      ≡  6a·s₀         (subtracted at evaluate time)
  new Monomial(6n,  [0, 2]),  //  6s₁²     ≡  3b·s₁²        (b=2, quadratic term)
  new Monomial(6n,  [2, 0]),  //  6s₀²     ≡  3b·s₀²
  new Monomial(6n,  [0, 3]),  //  6s₁³     ≡  2c·s₁³        (c=3, cubic term)
  new Monomial(6n,  [3, 0]),  //  6s₀³     ≡  2c·s₀³
]);

// buy from supply 10 to 15
// full degree-3 curve
costPoly.evaluate([10n, 15n]);

// truncate to degree 2 — drop the cubic price term, cheaper to evaluate on-chain
costPoly.truncate(2).evaluate([10n, 15n]);
```

The truncated version is an auditable approximation: you've declared in code that you are running a linear-price approximation, not a mistake.

---

## Composability: what SafeMath and Q-numbers cannot guarantee

| Property | SafeMath | PRBMath / Q-numbers | T^k |
|----------|----------|---------------------|-----|
| Overflow prevention | ✓ | partial | ✓ (bounded by degree table below) |
| Precision budget | — | ✓ | ✓ (residual is named) |
| Degree visible at boundary | — | — | ✓ |
| Field homogeneity across protocols | — | — | ✓ |
| Composition rule | none | none | $T^{\min(k,j)}$ — tighter bound wins |
| Caller can smuggle degree | n/a | n/a | no — assert `monomialDegree` at intake |

**SafeMath** operates on scalar values and fires on individual operations. It cannot see the shape of a multi-step computation and has no opinion on what degree polynomial produced a given `uint256`.

**PRBMath / Q-numbers** give you consistent precision *within* a protocol. The decimal scale is a local convention. When two protocols with different scales compose — USDC (6 decimals) calling into a DAI (18 decimals) pool via multicall — the scale mismatch is invisible to both libraries. Rounding errors at each crossing accumulate silently across calls.

**T^k** is a structural check. Degree is introspectable and assertable at a boundary:

```ts
// protocol boundary: reject any term above degree 2
const safe = poly.terms.every(t => t.degree <= 2);
```

```solidity
// on-chain equivalent
for (uint i = 0; i < poly.terms.length; i++) {
    require(_math.monomialDegree(poly.terms[i]) <= 2, "degree exceeds boundary");
}
```

The composition rule $T^k[T^j[p]] = T^{\min(k,j)}[p]$ means the tighter bound always wins — a degree-2 protocol accepting output from a degree-4 protocol can enforce its own degree constraint and the result is still well-defined. No equivalent exists in the scalar world of SafeMath or Q-numbers.

---

## Degree is a security boundary

At wei-scale inputs ($S = 10^{18}$), intermediate products in `evaluate` reach $S^{\text{degree}}$:

| Degree | Max intermediate | `uint256` headroom |
|--------|-----------------|-------------------|
| 1 | $10^{18}$ | safe |
| 2 | $10^{36}$ | safe |
| 3 | $10^{54}$ | safe |
| 4 | $10^{72}$ | approaching limit ($2^{256} \approx 10^{77}$) |
| 5+ | $10^{90}+$ | **overflow** |

A constant product curve (degree 2) enforced at degree 1 is a line — a completely different shape, trivially exploitable. Asserting `monomialDegree` at a protocol boundary is the on-chain analogue of a type check.

:::note Babylonian square root
When a computation genuinely requires $\lfloor\sqrt{n}\rfloor$ — for example, Uniswap V2 LP share minting — the Babylonian method finds it in pure integer arithmetic without ever leaving the natural numbers. The iteration is `x_{n+1} = (x_n + n/x_n) / 2`, converging in ~6 steps for `uint256`. This is the correct pattern whenever the §2 proportion approach (squaring both sides) is not sufficient.
:::
