---
sidebar_position: 1
---

# 1. The Monomial

A `Monomial` is the atomic unit of box arithmetic computation — a single term with a natural number coefficient and a list of variable exponents:

```
Monomial(coefficient: bigint, exponents: number[])
```

The **coefficient** is how many times this element appears in the box. The **exponents** say which variables it involves and at what power. That is all — no fractions, no floating point, no scaling.

```ts
import { Monomial } from 'boxmath';

new Monomial(3n, [2]);       // 3x²  — coefficient 3, x to the power 2
new Monomial(1n, [1, 1]);    // xy   — coefficient 1, x¹y¹
new Monomial(5n, []);        // 5    — constant term (no variables)
```

`evaluate(point)` substitutes natural numbers for the variables and returns the result:

```ts
new Monomial(3n, [2]).evaluate([4n]);        // 3 · 4² = 48n
new Monomial(1n, [1, 1]).evaluate([3n, 7n]); // 1 · 3 · 7 = 21n
```

Integers in, integer out. This is the whole primitive.
