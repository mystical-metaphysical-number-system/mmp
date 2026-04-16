---
sidebar_position: 1
---

# 1. Zero, the Box, and the Natural Numbers

Box arithmetic starts at the bottom — not with variables or polynomials, but with the simplest thing that exists: **nothing**.

## The empty box

The fundamental object is the **box** $\langle\; \rangle$ — an ordered container that can hold other things. Start with an empty one:

$$
\langle\; \rangle
$$

This is **zero**. Not a symbol standing in for an absence, but a concrete object: the box with nothing in it. Zero is real and it has a shape.

## Natural numbers as boxes

Put the empty box inside another box:

$$
\langle \langle\; \rangle \rangle
$$

That is **one**. Put two empty boxes in a box:

$$
\langle \langle\; \rangle,\; \langle\; \rangle \rangle
$$

That is **two**. The natural numbers are built by this nesting — each one is a box whose contents count up from zero. Addition is box union; multiplication is the box product. No axioms are assumed; the structure emerges from the containers alone.

## Why whole numbers first

Fractions, decimals, and irrationals are derived objects — shortcuts invented to name quantities that arise from division or limits. Box arithmetic insists on getting the whole numbers exactly right before introducing any shortcuts.

This matters for computation. Every shortcut carries an error budget:

- A fraction $\tfrac{p}{q}$ is only exact when $q$ divides $p$ evenly.
- A decimal like `1e6` is a scale convention that can differ silently between contracts.
- A floating-point number rounds to the nearest representable value.

Smart contracts enforce invariants — they do not approximate them. A rounding error of 1 unit is not "close enough"; it is either a vulnerability or a locked fund. The only arithmetic that is unconditionally safe on-chain is **natural number arithmetic**, and box arithmetic is a systematic framework for staying inside it.

## Primes as irreducible boxes

Prime numbers hold a special place in box arithmetic. The **Fundamental Theorem of Arithmetic** says every natural number greater than 1 factors uniquely into primes — the prime factorisation is the box's canonical form:

$$
12 = 2^2 \cdot 3 = \langle 2, 2, 3 \rangle
$$

Primes are the atoms: boxes that cannot be written as the product of smaller boxes. All other natural numbers are built from them. The `caretProduct` operation — the box `^` operator — generates every subset-product of a given set of primes, which is exactly the set of naturals whose prime factors come from that set:

```ts
import { caretProduct } from 'boxmath';

caretProduct([1n, 2n], [1n, 3n], [1n, 5n]);
// [1n, 5n, 3n, 15n, 2n, 10n, 6n, 30n]
// every product of subsets of {2, 3, 5}
```

The first two chapters of Wildberger's series explore this structure in depth — it is the foundation on which polynumbers and multinumbers are built.

:::info FIA and Smooth Number Fields (§8.1)

**FIA** — Fundamental Identity Arithmetic — is Wildberger's framework for working with finite subsets of the naturals defined by their prime structure. The key construction is the **caret product box** $M$.

Restrict to primes $\{2, 3, 5, 7\}$ and allow powers up to 2. Then:

$$
M \;\equiv\; \lfloor 1, 2, 2^2 \rfloor \mathbin{\hat{}} \lfloor 1, 3, 3^2 \rfloor \mathbin{\hat{}} \lfloor 1, 5, 5^2 \rfloor \mathbin{\hat{}} \lfloor 1, 7, 7^2 \rfloor
$$

This is a box of $3^4 = 81$ distinct natural numbers — exactly those whose prime factorizations use only $\{2, 3, 5, 7\}$ with exponents at most 2. In code:

```ts
import { caretProduct } from 'boxmath';

const M = caretProduct([1n, 2n, 4n], [1n, 3n, 9n], [1n, 5n, 25n], [1n, 7n, 49n]);
// 81 elements — every product 2^a · 3^b · 5^c · 7^d where a,b,c,d ∈ {0,1,2}
// smallest: 1   largest: 4 · 9 · 25 · 49 = 44100
```

## Where we go next

The natural numbers are sufficient for counting and multiplying, but they cannot name every quantity that arises in computation. The question of what happens when a natural number is needed but does not exist — like $\sqrt{2}$, or the exact output of a swap — is the subject of the next section.
