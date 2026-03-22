---
sidebar_position: 5
---

# Metaphysical Numbers

A **metaphysical number** is one whose displacement never closes. Every digit placed narrows the interval but the interval never reaches zero width. No finite length perfectly describes the number — it can only be approached.

## The Same Process on $\pi$

Apply the iterative zoom to $\pi = 3.14159265\ldots$:

| Zoom level | View window | Displacement |
|-----------|-------------|-------------|
| $1/1$ | $[3, 4)$ | width $1$ |
| $1/10$ | $[3.1, 3.2)$ | width $0.1$ |
| $1/100$ | $[3.14, 3.15)$ | width $0.01$ |
| $1/1000$ | $[3.141, 3.142)$ | width $0.001$ |
| $1/10000$ | $[3.1415, 3.1416)$ | width $0.0001$ |
| $\vdots$ | $\vdots$ | never zero |

The window shrinks at each step but never closes. $\pi$ has no finite address. $\frac{d}{dN}$ is always nonzero — adding more length always yields more precision, but the destination keeps retreating. Length and precision are directly proportional and neither reaches its end.

## $1/3$ in Base 10

The same phenomenon appears with a much simpler number: $\frac{1}{3} = 0.3333\ldots$ in base 10.

| Iteration | Value | Displacement |
|-----------|-------|-------------|
| 1 | $0.3$ | $0.0\overline{3}$ remaining |
| 2 | $0.33$ | $0.00\overline{3}$ remaining |
| 3 | $0.333$ | $0.000\overline{3}$ remaining |
| $N$ | $0.\underbrace{33\ldots3}_{N}$ | always nonzero |

The displacement shrinks geometrically but never vanishes. In base 10, $\frac{1}{3}$ behaves as a metaphysical number — it demands infinite length to be perfectly stated. This is a property of the base, not the number itself (see [Physicalization & Metaphysicalization](./Physicalization.md)).
