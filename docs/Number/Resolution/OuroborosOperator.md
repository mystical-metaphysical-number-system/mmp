---
sidebar_position: 3
---

# The Ouroboros Operator

## Two snakes, not one

The operator $\circlearrowright$ is the **ouroboros operator** — named after the ancient image of a snake consuming its own tail. But here there are two snakes, each eating the other's tail. What emerges from their encounter depends entirely on **which one leads**.

$$
\{\}_- \circlearrowright \{\}_+ = \{\{\}\}_+ = +1
$$
$$
\{\}_+ \circlearrowright \{\}_- = \{\{\}\}_- = -1
$$

The same two objects, the same operator, opposite results. Order is everything.

## Two rules

The behaviour of $\circlearrowright$ follows two simple rules:

**Rule A — opposite orientations meet (generative):**
When a positive void meets a negative void, or vice versa, the encounter *promotes* — it climbs to the next nesting level. The left operand determines the sign of the result. This is the operation that creates number from nothingness.

**Rule B — same orientations meet (absorptive):**
When a void meets its own kind, nothing new is generated. The higher-ranked one simply absorbs the lower and persists unchanged. A void meeting only itself has nothing to push against — no creation, no rank increase.

## The truth table

| Left | Right | Result | Rule |
|:----:|:-----:|:------:|:----:|
| $\{\}_-$ | $\{\}_+$ | $\{\{\}\}_+ = +1$ | A: generative |
| $\{\}_+$ | $\{\}_-$ | $\{\{\}\}_- = -1$ | A: generative |
| $\{\}_-$ | $\{\}_-$ | $\{\}_-$ | B: absorptive |
| $\{\}_+$ | $\{\}_+$ | $\{\}_+$ | B: absorptive |

The first two rows are $0^0 = \pm 1$ — the result depends on which oriented zero came first. The last two say a void meeting only itself simply persists.

## The rules extend to higher ranks

The same two rules apply at every nesting level:

| Left | Right | Result |
|:----:|:-----:|:------:|
| $\{\{\}\}_+$ | $\{\}_-$ | $\{\{\{\}\}\}_-$ (A: climbs one level, sign flips) |
| $\{\{\}\}_-$ | $\{\{\}\}_+$ | $\{\{\{\{\}\}\}\}_+$ (A: climbs one level, sign flips) |
| $\{\{\}\}_-$ | $\{\}_-$ | $\{\{\}\}_-$ (B: same sign, higher rank absorbs) |

Each opposite-orientation encounter threads into the next nesting level — a dimensional step up, not a movement within a fixed space.

## Order matters — and this is not a defect

$\circlearrowright$ is **not commutative** under Rule A, and it is **not associative**. Neither of these is a flaw. The order of encounter determines the sign of what is produced, and grouping changes the path through rank. This is exactly how crossings work in knot theory — the over/under assignment at each crossing determines the knot, and changing the order of crossings changes the knot.

## What zero actually requires

In ordinary computing, $0$ is a value you can assign directly. In MMP, expressing zero in a circuit requires **one positive void and one negative void held in balance** — a tension maintained, not a value stored. It is not that zero is absent; it is that zero is the *result of equilibrium* between two oriented poles.

| Classical bit | MMP equivalent |
|:---:|:---:|
| $0$ | $\{\}_-$ and $\{\}_+$ in balance (not directly assignable) |
| $+1$ | $\{\}_- \circlearrowright \{\}_+$ |
| $-1$ | $\{\}_+ \circlearrowright \{\}_-$ |
| NOT | swap orientation: $\{\}_+ \leftrightarrow \{\}_-$ |
| same-kind encounter | absorptive — Rule B |
| opposite-kind encounter | generative — Rule A, climbs rank |

The integers are not assumed — they are **produced** by ordered encounters of oriented nothingness with itself.
