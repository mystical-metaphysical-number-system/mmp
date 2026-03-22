---
sidebar_position: 2
---

# The Ouroboros Operator

There is one operator — $\odot$ — and it acts on oriented voids. Its behavior depends entirely on whether the orientations of its operands match or cross.

## Cross-composition

Opposite orientations meeting promotes to the nested level. The **order** of that crossing determines the sign of unity:

$$
\{\}_- \odot \{\}_+ = \{\{\}\} = 1 \\
\{\}_+ \odot \{\}_- = \{\{\}\} = -1
$$

## Self-composition (Superposition Principle)

Same orientations stay at the void level. $\{\}_+$ and $\{\}_-$ are **fixed points** of same-sign composition; they absorb themselves rather than promoting:

$$
\{\}_- \odot \{\}_- = \{\}_- \\
\{\}_+ \odot \{\}_+ = \{\}_+
$$

- Left `N` with right `dN`
- Left `dN` with right `N`
- Both — for nothingness

## The Trinary Structure

These two behaviors produce three distinct **ontological levels**, each with its own character under $\odot$:

| Level | Objects | Nature |
|-------|---------|--------|
| 0 | null $\{\}$ | unresolved, the pole itself |
| 1 | $\{\}_+$, $\{\}_-$ | oriented voids, fixed points |
| 2 | $\{\{\}\} = \pm 1$ | resolved unity, signed |

$\{\}_-$ as "negative zero" and $\{\}_+$ as "positive zero" maps onto the IEEE 754 floating-point distinction between $+0$ and $-0$ — which most programmers treat as a curiosity but MMP would say is **physically necessary**. The computer already knew.
