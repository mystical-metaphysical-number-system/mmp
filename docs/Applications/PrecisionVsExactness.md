---
sidebar_position: 2
---

# Precision vs Exactness

These two words are often used interchangeably. MMP distinguishes them sharply.

**Exactness** is a property of the number itself — whether it has a finite description. $\frac{1}{4}$ is exact in base 10. $\frac{1}{3}$ is not. $\pi$ is not. Exactness is absolute: a number either terminates or it doesn't, in a given base.

**Precision** is a property of the description at a given length — how much displacement remains on the numberline after $N$ digits have been placed. Precision is always nonzero for metaphysical numbers and always reaches zero for physical ones, but at any finite $N$ it is a measurable quantity: $\frac{d}{dN}$.

## Why the Distinction Matters

Standard numerical analysis talks about precision — significant figures, error bounds, floating-point ULP (units in the last place). It rarely talks about exactness except to note that transcendental numbers are "irrational" and move on. This conflation causes two practical problems:

**Problem 1 — Mistaking finite precision for exactness.** A float stored to 15 significant digits looks exact. It is not. It has a nonzero displacement that accumulated from the moment the number was truncated. Treating it as exact propagates invisible error.

**Problem 2 — Mistaking exactness for a property of the number rather than the base.** $\frac{1}{3}$ is not inherently inexact — it is exact in base 12. The error is not in the number; it is in the mismatch between the number and the base. Choosing the right base for the domain is a design decision, not a mathematical inevitability.

## MMP's Framing

In MMP, every finite representation carries a known precision:

$$
\text{precision at } N = \frac{d}{dN}\bigg|_N
$$

For physical numbers this reaches zero. For metaphysical numbers it never does. The engineering question "how many digits do I need?" is the question "at what $N$ does the precision drop below my tolerance?" — and MMP makes that question answerable without pretending the truncation didn't happen.
