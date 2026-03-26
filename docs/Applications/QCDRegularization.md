---
sidebar_position: 11
---

# QCD Regularization & Oriented Poles

Quantum chromodynamics — the theory of the strong force — is arguably the most precisely tested physical theory we have. Yet at its computational core sits a procedure that standard mathematics cannot fully justify: **regularization**, the controlled navigation of divergences at the boundary of the number system.

MMP's oriented void algebra offers a natural language for what is actually happening.

## The divergence problem

Loop integrals in QFT diverge at two boundaries:

- **Ultraviolet (UV):** $k \to \infty$ — the integral blows up at high momentum
- **Infrared (IR):** $k \to 0$ — the integral blows up at zero momentum

These are not symmetric accidents. The Heisenberg uncertainty relation

$$\Delta x \cdot \Delta k \sim 1$$

makes the trade-off explicit: push momentum to infinity ($k \to \infty$) and position localises to a point — **zero length, infinite precision**, $\{\}_+$. Push momentum to zero ($k \to 0$) and the state delocalises entirely — **infinite length, zero precision**, $\{\}_-$.

The UV and IR divergences are therefore the **two oriented poles of the MMP number line expressing themselves physically**. The full quaternary picture is present:

$$
0 \circlearrowright \infty = \{\}_+ \qquad \infty \circlearrowright 0 = \{\}_-
$$

Zero precision and zero length held in tension — the same quaternary balance that bequeaths the continuum, now showing up as the boundary conditions of quantum field theory. Standard arithmetic cannot evaluate at either pole; regularization is the controlled algebra of approaching without arriving.

## The $i\epsilon$ prescription as orientation

The Feynman propagator writes the dangerous denominator as:

$$
\frac{1}{k^2 - m^2 + i\epsilon}
$$

The $+i\epsilon$ shifts the pole off the real axis, specifying *which side* to approach from when integrating over $k$. Remove it and the integral is undefined; restore it and the result is determinate.

MMP reads this directly: $i\epsilon$ is the **directional information** that the unoriented $0$ was missing. The propagator pole is a mystical number — $\{\}$ without orientation — and the $i\epsilon$ prescription orients it, choosing $\{\}_+$ or $\{\}_-$ before the composition is evaluated. Indeterminacy is the price of forgetting orientation; the $\epsilon$ is how physics quietly reinstates it.

## Dimensional regularization as fractional demotion

A more powerful technique analytically continues spacetime from $d = 4$ to $d = 4 - 2\epsilon$, computes in the fractional dimension where integrals converge, then takes $\epsilon \to 0$. The divergences resurface as poles in $\epsilon$:

$$
\frac{1}{\epsilon}, \quad \frac{1}{\epsilon^2}, \quad \ldots
$$

These are then subtracted in the renormalization step.

In MMP's language: the fractional dimension step sidesteps the mystical boundary by never quite arriving at $d = 4$. The poles in $\epsilon$ are the oriented voids re-emerging as $\epsilon \to 0$. Renormalization — subtracting the pole — is an instance of the demotion operator $\circlearrowleft$: stripping one level of divergence to recover a finite residue.

$$
\text{(divergent integral)} \;\circlearrowleft\; \{\}_\pm \;=\; \text{(finite result)}
$$

## The half-dimension and evanescent operators

In dimensional regularization, certain operator structures — called **evanescent operators** — vanish exactly in $d = 4$ but contribute in $d = 4 - 2\epsilon$. They are objects that only exist in the fractional-dimensional intermediate step, leaving a finite trace after $\epsilon \to 0$.

MMP would frame these as transiently inhabiting the void level: they are not physical at rank 1 ($d=4$) but they pass through the boundary and deposit something real before vanishing. The half-dimension is not a pathology — it is the oriented crossing point.

## TODO

- Work out the specific MMP rank assignment for UV vs IR poles and their demotion residues
- Examine whether the renormalization group flow (running coupling) has a natural reading as iterated $\circlearrowright / \circlearrowleft$ compositions
- Investigate zeta function regularization ($\sum n = -1/12$) as another instance of analytic continuation through the mystical boundary
