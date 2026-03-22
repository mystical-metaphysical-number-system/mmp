---
sidebar_position: 8
---

# Balanced Ternary

The Soviet **Setun** computer (1958, Nikolay Brusentsov) operated in **balanced ternary** with digits $\{-1, 0, +1\}$ (written $\{\bar{1}, 0, 1\}$). Brusentsov showed it is the *most efficient* radix for information encoding — it minimizes the product of radix and number of digits needed for a given range.

MMP maps onto this exactly:

| MMP | Balanced Ternary |
|-----|------------------|
| $\{\}_-$ | $-1$ trit |
| null $\{\}$ | $0$ trit |
| $\{\}_+$ | $+1$ trit |

But MMP adds something Setun does not: it explains *why* these three are the natural primitives. They are not chosen for efficiency; they **fall out of the oriented void algebra**. The trinary is not imposed, it is discovered.

Brusentsov noted that balanced ternary handles negation for free — flip all signs, no two's complement. In MMP terms: $\{\}_+ \leftrightarrow \{\}_-$ — the ouroboros reversal.
