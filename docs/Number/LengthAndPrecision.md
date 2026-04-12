---
sidebar_position: 2
---

import DocVideo, {DocImg} from '@site/src/components/DocVideo';

# Length & Precision

Every number has two fundamental properties:

- **Length (N)** — the number of digits required to perfectly describe the number
- **Precision (dN)** — the displacement along the numberline per stepwise digit; `d/dN`

## Iterative Resolution

All numerical quantities resolve their precision **iteratively with length**. Consider the number `12345` — we arrive at the true value one digit at a time:

| Step | Value | Displacement remaining |
|------|-------|----------------------|
| 1 | `1` | large |
| 2 | `12` | smaller |
| 3 | `123` | smaller |
| 4 | `1234` | smaller |
| 5 | `12345` | zero |

Each digit added reduces our displacement on the numberline. Precision is the rate at which that displacement shrinks per unit of length. A finite number reaches zero displacement in finite steps. A transcendental number never does — it keeps demanding more length, and its precision is always nonzero, always retreating.

This is the MMP framing of what Cauchy sequences describe analytically: the terms of a sequence are within $\frac{\varepsilon}{2}$ of the limit, find $N \in \mathbb{N}$ so that $|s_n - A| < \frac{\varepsilon}{2}$. In MMP language, the sequence is walking down the digits and the limit is the number it is trying to describe.

<DocImg src="/img/wildberger-cauchy.png" style={{maxWidth: '100%'}} />

*Norman Wildberger on Cauchy sequences of rationals — [Real numbers and limits Math Foundations 111](https://www.youtube.com/watch?v=6JjPA3msnbo)*

## The Golden Ratio — Resolution of the Most Irrational Number

The Fibonacci sequence resolves $\varphi$ — the golden ratio, the universe's most irrational number — iteratively:

$$
\varphi = 1.6180339987\ldots
$$

Each successive ratio of consecutive Fibonacci terms is a better approximation — the displacement from $\varphi$ decreases with each step, length increases, precision tightens. The golden ratio is the **slowest** converging continued fraction precisely because it is maximally irrational: it demands the most length for the least precision gain per step.

<DocImg src="/img/1_keS1Io-VsoLjotdcOS34iA.gif" style={{maxWidth: '100%'}} />

In MMP terms, $\varphi$ is a number with infinite length and perpetually nonzero precision — yet the Fibonacci sequence demonstrates nature resolving it iteratively, digit by digit, ratio by ratio.

## The Circle Paradox

<DocVideo src="/img/circle-apex.webm" />

Here is a motivating hint at the deeper problem. We approximate a circle by increasing the number of vertices of a polygon — more sides, closer to the curve, precision tightens with each step. By MMP's framing this is a metaphysical number in progress: $\pi$ is being approached iteratively, length growing, displacement shrinking.

But consider the limit. A circle has no sides. The polygon with infinite vertices is not a circle — it is a metaphysical thing pretending to be one. The circle itself sits outside the iterative process entirely, belonging to a class of object the process can approach but never become. The question of whether a smooth curve is the limit of a jagged one, or something categorically different, is precisely the question MMP asks of all transcendental quantities.

## Three Classes of Number

MMP observes that all numbers fall into exactly three situations with respect to length and precision:

| Class | Relationship | Description |
|-------|-------------|-------------|
| **Physical** | Precision reaches zero at finite length | Perfect description in finite digits — displacement closes |
| **Metaphysical** | Length and precision directly proportional | Adding digits never closes the displacement; $\varphi$, $\sqrt{2}$, $\pi$ live here |
| **Mystical** | Length and precision inversely proportional | Adding magnitude *reduces* precision — the boundary paradox at zero and infinity |

Physical numbers are those the numberline can hold exactly. Metaphysical numbers demand infinite length — nature can approach them iteratively but never land. Mystical numbers are the poles themselves: zero, with infinite precision and no length, and infinity, with infinite length and no precision. In the mystical case, length and precision trade off completely — each step toward one is a step away from the other.
