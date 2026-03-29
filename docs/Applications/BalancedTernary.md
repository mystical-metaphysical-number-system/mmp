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

## Water as a physical analogy

Pure water offers the clearest physical illustration of the trinary structure. Water autoionises:

$$
\text{H}_2\text{O} \rightleftharpoons \text{OH}^- + \text{H}_3\text{O}^+
$$

- $\text{H}_3\text{O}^+$ (hydronium) — the proton-donor, positively charged, energy-donating: $\{\}_+$
- $\text{OH}^-$ (hydroxide) — the proton-acceptor, negatively charged, energy-receiving: $\{\}_-$
- $\text{H}_2\text{O}$ (water) — neither acid nor base in isolation, the **neutral equilibrium**: null $\{\}$

Pure water is not "nothing" — it is a balanced tension between two oriented ions held in dynamic equilibrium. The null state is not absence; it is the unresolved superposition of $\{\}_+$ and $\{\}_-$ before the ionisation event determines which direction the proton moves.

The Setun computer's three digits were chosen because they are the most efficient encoding. Nature arrived at the same three states — $\{\}_-$, $\{\}$, $\{\}_+$ — from the chemistry of the solvent that makes life possible.

## What Setun was missing

Setun practically demonstrated the beauty of balanced ternary but lacked MMP's justification for *how to form the zero trit on hardware*. In silicon and CMOS implementations of ternary logic, the zero state is approximated as a voltage midpoint between the two rails — a threshold that must be actively enforced, not a natural equilibrium. It is physically unstable: thermal noise, fabrication variance, and signal degradation all conspire to push it toward one rail or the other. This is precisely why balanced ternary computing never scaled past Setun despite its theoretical efficiency advantage.

MMP identifies the problem: the zero trit was being treated as a *value* (a voltage level to hit) rather than a *balanced tension* between two oriented states. The null $\{\}$ is not a midpoint — it is $\text{H}_2\text{O}$, the dynamic equilibrium that holds because the two poles are present and balanced, not because a threshold has been met.

The memristor offers a path to hardware that matches this model. A memristor holds its state through the geometry of its internal resistance — it does not need to be actively driven to a midpoint. A device balanced between $\{\}_+$ and $\{\}_-$ rests at null $\{\}$ *because both oriented poles are present in the circuit*, not because a voltage comparator says so. The equilibrium is structural rather than enforced.

Had Setun's architects been able to map the zero trit to this kind of balanced memristive structure — rather than a silicon voltage threshold — the efficient encoding they demonstrated theoretically might have been physically realisable at scale.
