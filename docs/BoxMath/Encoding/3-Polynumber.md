---
sidebar_position: 3
---

# 3. Single Variable: Polynomial → Polynumber

Start with a polynomial you recognise:

$$
p(x) = 2 + 3x + x^2
$$

In standard notation this is shorthand for three things added together: a constant, a linear term, and a quadratic term. The coefficients are $\{2, 3, 1\}$ and the exponents tell you which power of $x$ each one sits on.

A **polynumber** is just a box holding those coefficients as natural numbers, ordered by degree:

$$
p = \langle 2,\; 3,\; 1 \rangle
$$

The "variable" $\alpha$ is itself the polynumber $\langle 1 \rangle$ — a box holding the natural number 1. Powers of $\alpha$ are:

$$
\alpha^0 = \langle\rangle = 1 \qquad \alpha^1 = \langle 1 \rangle \qquad \alpha^2 = \langle 2 \rangle \qquad \alpha^n = \langle n \rangle
$$

So $p = 2\cdot\alpha^0 + 3\cdot\alpha^1 + 1\cdot\alpha^2$ — the box *is* the coefficient array, nothing more.

**Evaluation** substitutes a natural number for $\alpha$ and computes:

$$
p(5) = 2 + 3 \cdot 5 + 5^2 = 2 + 15 + 25 = 42
$$

In `boxmath`:

```ts
import { Monomial, MultiPoly } from 'boxmath';

const p = new MultiPoly([
  new Monomial(2n, []),   // 2  (degree 0 — the constant)
  new Monomial(3n, [1]),  // 3x (degree 1)
  new Monomial(1n, [2]),  // x² (degree 2)
]);

p.evaluate([5n]);  // 42n
```

Each `Monomial` carries its coefficient and exponent vector. `MultiPoly` is the box holding all three terms. `evaluate` hands back a natural number — integers in, integer out, no fractions anywhere.
