---
sidebar_position: 4
---

# Physical Numbers

A **physical number** is one whose displacement on the numberline closes to zero in a finite number of iterations. Each digit placed reduces the uncertainty in its position; eventually the uncertainty is gone and the number is perfectly described. It is exactly where it is.

## Measuring Displacement

Consider the number $7423$. We iterate digit by digit and track the remaining displacement — the width of the interval on the numberline within which the true value still lies:

| Iteration | Value known | Displacement |
|-----------|-------------|-------------|
| 1 | `7___` | within $[7000, 8000)$, width $10^3$ |
| 2 | `74__` | within $[7400, 7500)$, width $10^2$ |
| 3 | `742_` | within $[7420, 7430)$, width $10^1$ |
| 4 | `7423` | exactly $7423$, width $0$ |

$\frac{d}{dN}$ — the precision per digit — is constant and nonzero throughout, then drops to zero at step 4. The number is physical because that drop happens at finite $N$.

## The Infinite Zoom Analogue

The same idea has a spatial reading. Zoom into the numberline by a factor of 10 at each step, centering on the value. Each zoom reduces our displacement by one order of magnitude:

| Zoom level | View window | Resolution |
|-----------|-------------|------------|
| $1/1$ | $[0, 10)$ | ones |
| $1/10$ | $[7, 8)$ | tenths |
| $1/100$ | $[7.4, 7.5)$ | hundredths |
| $1/1000$ | $[7.42, 7.43)$ | thousandths |
| $1/10000$ | $[7.423, 7.424)$ | ten-thousandths |

At each step the window closes. For a physical number the window reaches a point — a single location — in finite steps. The zoom terminates. The number has an address.
