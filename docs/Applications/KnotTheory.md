---
sidebar_position: 10
---

# Knot Theory

## Tait's Knots

Peter Guthrie Tait (1831–1901) was the first to systematically tabulate knots, working in collaboration with Lord Kelvin's vortex atom theory — the idea that atoms were knotted tubes of ether. The project was abandoned when the ether was disproved, but the mathematics Tait produced was real: a classification of knots by crossing number that stands today.

Tait's insight was that knots are **topological invariants** — a knot cannot be continuously deformed into a different knot without cutting the strand. The crossing number is the minimum number of crossings in any diagram of the knot.

| Crossings | Knots |
|-----------|-------|
| 0 | unknot $0_1$ |
| 3 | trefoil $3_1$ |
| 4 | figure-eight $4_1$ |
| 5 | $5_1$, $5_2$ |
| 6 | $6_1$, $6_2$, $6_3$ |
| 7 | $7_1$, $7_2$, $7_3$, $7_4$, $7_5$, $7_6$, $7_7$ |

<img src="/img/fig34_fig3.svg" style={{maxWidth: '100%'}} />

## Numbers as Knots

MMP reads the integers as knots of the infinite nothingness. The crossing number *is* the integer — not a count of empty boxes assembled from a given zero, but a topological fact about how the void has folded into itself.

$$
n \leftrightarrow n_1 \text{ torus knot} \leftrightarrow \text{infinite nothingness folded } n \text{ times}
$$

The unknot $0_1$ corresponds to the unfolded void — null $\{\}$, prior to any nesting. The trefoil $3_1$ is three. The $7_1$ torus knot is seven. Each integer is a distinct, undeformable topological object — you cannot continuously transform $7$ into $6$ without cutting, which is why integers are discrete.

## Why This Matters

In standard box arithmetic, $7 = \{\{\{\{\{\{\{\}\}\}\}\}\}\}$ — seven nestings of the empty box. The structure is correct. But the question "why is nesting the right operation?" is left unanswered. Knot theory provides a geometric answer: nesting *is* folding, and folding a closed strand produces a knot. The crossing number counts the folds. The integer is the invariant.

This also clarifies why you cannot have a fractional knot: topological invariants are discrete by nature. The continuum lives at the level of the strand itself — the void — not at the level of the crossings.

_TODO: explore knot invariants (Jones polynomial, Alexander polynomial) as potential box arithmetic operations_
