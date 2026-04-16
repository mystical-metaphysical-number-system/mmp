---
sidebar_position: 2
---

# 1. Polynumbers

Box arithmetic begins with the **natural numbers** — zero and the counting numbers. No negatives, no fractions, no irrationals. Everything built from here stays in that world.

The first extension above the naturals is the **polynumber** — Wildberger's name for what you already know as a polynomial, reinterpreted as a finite box of natural numbers.

## Polynomials as boxes

Start with a polynomial you recognise:

$$
p(\alpha) = 2 + 3\alpha + \alpha^2
$$

In standard notation this bundles three things together: a constant term, a linear term, and a quadratic term. Strip away the variable and what remains are the **coefficients** $\{2, 3, 1\}$ together with their degree positions. A polynumber is just that box:

$$
p = \langle 2,\; 3,\; 1 \rangle
$$

The "variable" $\alpha$ is itself the polynumber $\langle 1 \rangle$ — a box holding the natural number 1. Powers of $\alpha$ are:

$$
\alpha^0 = \langle\rangle = 1 \qquad \alpha^1 = \langle 1 \rangle \qquad \alpha^2 = \langle 2 \rangle \qquad \alpha^n = \langle n \rangle
$$

So $p = 2\cdot\alpha^0 + 3\cdot\alpha^1 + 1\cdot\alpha^2$ — the box *is* the coefficient array, nothing more.

**Evaluation** substitutes a natural number for $\alpha$:

$$
p(5) = 2 + 3 \cdot 5 + 5^2 = 42
$$

Integers in, integer out. No fractions appear at any step.

## The `Polynumber` type

In `boxmath`, a single term is a `Polynumber`: a coefficient paired with a sparse exponent vector that encodes which variables appear and at what power.

```
Polynumber(coefficient: bigint, exponents: number[])
```

| Field | Meaning |
|-------|---------|
| `coefficient` | Natural number scalar weight |
| `exponents[i]` | Power of variable $x_i$ |

```ts
import { Polynumber, Multinumber } from 'boxmath';

new Polynumber(3n, [2]);       // 3x²  — coefficient 3, x²
new Polynumber(1n, [1, 1]);    // xy   — coefficient 1, x¹y¹
new Polynumber(5n, []);        // 5    — constant (no variables)
```

A **`Multinumber`** is the box that holds multiple `Polynumber` terms together — the full polynomial object:

```ts
// p(x) = 2 + 3x + x²
const p = new Multinumber([
  new Polynumber(2n, []),   // 2  (degree 0)
  new Polynumber(3n, [1]),  // 3x (degree 1)
  new Polynumber(1n, [2]),  // x² (degree 2)
]);

p.evaluate([5n]);  // 42n
```

`evaluate` hands back a natural number — the box is evaluated term by term and the results summed. This is the whole primitive: no division, no floating point, no scaling anywhere in the chain.
