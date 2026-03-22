---
sidebar_position: 3
---

# Harmonic Proportions

Harmonic proportions — ratios of small integers — are the natural language of acoustics, tuning, and resonance. They are also where the mismatch between the real number system and physical reality shows up most clearly.

## The Error Accumulation Problem

When harmonic ratios are approximated in base 10 (or in binary floating-point), the denominators often contain prime factors that the base cannot represent exactly. A fifth ($3/2$), a major third ($5/4$), a seventh harmonic ($7/4$) — these are all exact ratios, but their decimal representations are either terminating by luck ($5/4 = 1.25$) or repeating by necessity ($7/4 = 1.75$, fine, but $7/6 = 1.1\overline{6}$).

The problem compounds when ratios are chained. Tuning a scale means stacking fifths, thirds, and sevenths. Each step introduces a small representational error; the errors accumulate; and by the time you've gone around the circle of fifths you've drifted from where you started. This is the **comma** problem in music theory — the Pythagorean comma, the syntonic comma, the septimal comma — each a measure of how much error has accumulated from chaining exact ratios in an inexact base.

## MMP's Reading

MMP frames this as a physicalization problem. The ratios themselves are physical — they terminate in the right base. The error is not inherent to the ratios; it is a consequence of describing them in a base whose prime factors don't match the harmonic series.

The harmonic series has prime factors $\{2, 3, 5, 7, 11, \ldots\}$. Base 10 has only $\{2, 5\}$. Base 12 adds $3$. Base 60 adds $\{2, 3, 5\}$. No finite base covers the full harmonic series — but some bases are dramatically better than others for specific domains.

The practical implication: for any domain defined by harmonic ratios up to a given prime limit, there is an optimal base. Computing in that base eliminates representational error entirely for all ratios within the limit. This is not an approximation strategy — it is the observation that the error was never in the numbers, only in the choice of base.

_TODO: work through specific examples — 5-limit, 7-limit, 11-limit — and their optimal bases_
