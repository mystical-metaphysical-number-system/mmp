---
sidebar_position: 11
---

import {DocImg} from '@site/src/components/DocVideo';

# Box Math

<iframe width="100%" style={{aspectRatio: '16/9'}} src="https://www.youtube.com/embed/4xoF2SRp194" title="Box Arithmetic" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

## Wildberger's Box Arithmetic

Norman Wildberger proposes a leaner foundation for mathematics — one in which every object is genuinely finite, directly constructible, and immediately encodable on a computer:

> *"We would like to propose a leaner foundation, called Box Arithmetic, in which every object is genuinely finite, directly constructible, and immediately encodable on a computer. The primary data structure is not a set but a multiset — which we call a box — where repetition is allowed and order is unimportant. Starting from a single object, the empty box (which we call zero), every mathematical object in our framework is built by finite nesting."*

This is a serious proposal. It addresses the core complaint against standard foundations — that real numbers, infinite sets, and limit processes are not directly computable — and replaces them with a structure that maps cleanly onto what a computer actually does: finite nesting of finite objects.

The notation maps directly to the void algebra:

| Box Arithmetic | MMP |
|---------------|-----|
| empty box $\{\}$ = zero | null void $\{\}$ |
| nested box $\{\{\}\}$ = one | $\{\}_- \circlearrowright \{\}_+ = \{\{\}\} = 1$ |
| multiset (repetition allowed) | box with multiplicity |

## The MMP Rebasing

<DocImg src="/img/mmp-reparse.png" style={{maxWidth: '100%'}} />

Wildberger's construction starts from the empty box $\{\}$ as the primordial object — zero is given, and everything is built by nesting from there. This is clean, finite, and computable. MMP accepts all of that.

The single departure: **the empty box is not primordial**. It is derived.

The empty box $\{\}$ — null — is what you get when the positive void $\{\}_+$ and negative void $\{\}_-$ cancel under addition. It is the *result* of orientation erasure, not a first principle. To begin from $\{\}$ without asking where it came from is to start from a result and call it a foundation.

MMP asks: if zero is the empty box, where does the empty box come from? The answer — it comes from the cancellation of the two oriented poles, which themselves arise from the infinite nothingness — is what the rest of this section has been building toward. The box arithmetic Wildberger describes is the correct computational machinery. MMP simply provides the prior chapter: the one that explains why the empty box exists and what it means.

From the infinite nothingness, through the ouroboros operator, to the empty box, to finite nesting — the full arc is:

$$
\quad \{\}_\pm \quad \Rightarrow \quad \{\} \quad \Rightarrow \quad \{\{\}\} = 1 \quad \Rightarrow \quad \text{box arithmetic}
$$

## Numbers as Knots of Nothingness

In box arithmetic, $3$ is encoded as three copies of the empty box held in one box — a multiset, where repetition is allowed and order is unimportant:

$$
3 = \{\{\}\;\{\}\;\{\}\}
$$

This is correct and computable. But MMP suggests a different reading of what that structure *is*. Each empty box is not "one more zero added" — it is one more fold of the infinite nothingness. $3$ is not a pile of three zeroes. It is the infinite nothingness, knotted.

The analogy is the **$3_1$ trefoil knot** — the simplest non-trivial knot, a single continuous strand that crosses itself exactly three times to produce a closed, self-consistent object. The crossings are not separate things; they are the same strand in relationship with itself. Counting the crossings gives you the number, but the number *is* the knot — a topological fact about how nothingness has been folded.

$$
3 \leftrightarrow 3_1 \text{ trefoil} \leftrightarrow \{\{\}\;\{\}\;\{\}\} \leftrightarrow \text{infinite nothingness folded 3 times}
$$

<div style={{background: 'white', padding: '1rem'}}><DocImg src="/img/3184-Knot table.png" style={{maxWidth: '100%'}} /></div>

This reframes what integers mean in MMP: not a count of empty boxes assembled from a zero that was given, but a **topological invariant** of a self-knotted void. The empty box is still the unit. But the unit is not flat — it is a fold, and the number is the depth of the folding. See [Knot Theory](../Applications/KnotTheory.md) for the full extension.

## Box Arithmetic Operations

The four fundamental operations on boxes follow directly from the multiset structure:

**Addition** (box union with multiplicity) — merge the contents of two boxes into one:

$$
\langle A, B \rangle + \langle C \rangle = \langle A, B, C \rangle
$$

Note that $\langle x, x \rangle \neq \langle 2x \rangle$ — repetition is preserved, not collapsed. This is distinct from algebraic simplification.

**Multiplication** (Cauchy / caret product) — form all pairwise products of elements:

$$
A \times B = \{ a \cdot b \mid a \in A,\, b \in B \}
$$

For polynumbers (boxes of naturals), this is the standard Cauchy convolution of coefficient arrays. For general boxes it is the Cartesian product.

**The caret** `A ^ B` generalises this to a box-valued outer product, and is the engine behind the Finite Ideal Approximation exercises in [Box Math & Primes to 11](../ArchaeoArithmetic/BoxMathPrimes.md):

$$
\{1, 2\} \mathop{\hat{}}\, \{1, 3\} = \{1 \cdot 1,\, 1 \cdot 3,\, 2 \cdot 1,\, 2 \cdot 3\} = \{1, 2, 3, 6\}
$$

**Evaluation** $p(A)$ — substitute a box $A$ in place of the variable in a polynumber $p$, then apply multiplication. Element evaluation $p\langle A \rangle$ distributes elementwise: $p\langle A \rangle = \langle p(a) \mid a \in A \rangle$.

These operations are implemented in the `boxmath` TypeScript package and the `BoxMath.sol` Solidity contract. See the [BoxMath SDK](../BoxMath/BoxMathSDK.md) for code examples, the fixed-point encoding, and how each operation maps to the classes in the library.
