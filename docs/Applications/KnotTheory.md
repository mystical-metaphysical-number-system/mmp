---
sidebar_position: 10
---

import {DocImg} from '@site/src/components/DocVideo';

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

<div style={{background: 'white', padding: '1rem'}}><DocImg src="/img/3184-Knot table.png" style={{maxWidth: '100%'}} /></div>

## Numbers as Knots

MMP reads the integers as knots of the infinite nothingness. The crossing number *is* the integer — not a count of empty boxes assembled from a given zero, but a topological fact about how the void has folded into itself.

$$
n \leftrightarrow n_1 \text{ torus knot} \leftrightarrow \underbrace{\{\}\;\{\}\;\ldots\;\{\}}_{n} \leftrightarrow \text{infinite nothingness folded } n \text{ times}
$$

The unknot $0_1$ corresponds to the unfolded void — null $\{\}$, prior to any nesting. The trefoil $3_1$ is three. The $7_1$ torus knot is seven. Each integer is a distinct, undeformable topological object — you cannot continuously transform $7$ into $6$ without cutting, which is why integers are discrete.

## Why This Matters

In box arithmetic, $3 = \{\{\}\;\{\}\;\{\}\}$ — three copies of the empty box in a multiset. The structure is correct and computable. But the question "why is this the right encoding?" is left unanswered. Knot theory provides a geometric answer: each copy of the empty box is a fold, and folding a closed strand produces a knot. The crossing number counts the folds. The integer is the invariant. The trefoil $3_1$ is the simplest non-trivial knot — three crossings, three folds, three empty boxes.

This also clarifies why you cannot have a fractional knot: topological invariants are discrete by nature. The continuum lives at the level of the strand itself — the void — not at the level of the crossings.

_TODO: explore knot invariants (Jones polynomial, Alexander polynomial) as potential box arithmetic operations_

_TODO: **Sphere eversion** — Smale's proof that a sphere can be turned inside-out through itself without tearing or creasing, passing through self-intersections. Consider how MMP's frame-up/frame-down operators ($\{\}_+$ / $\{\}_-$) and the notion of dimension-climbing via $\odot$ might provide a natural language for describing eversion: the inside-out transition as a change of orientation of the void, passing through null $\{\}$ at the moment of self-intersection._
