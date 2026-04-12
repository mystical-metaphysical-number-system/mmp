---
sidebar_position: 5
---

import DocVideo, {DocImg} from '@site/src/components/DocVideo';
import SODTable from '@site/src/components/SOD';

# Box Math & Primes to 11

As an application we consider the finite proportions of the great pyramid and contextify them within the frame work of the box arithmetic.

We begin by acknowledging the kepler relation in the great pyrmaid in the cubit numbers 220, 280 and their primes in 2,3,5,7,11. (we will include 356 shortly later, our inpsection here will be focused on the comparing the limiting summation intervatal bretween various field generators with 89 and 317 as well).

we will than apply the FIA in powers of 1 and than separately in powers of 2 and then powers of 3, finally we will square 220 and 280 and compare their pythagorean boxes in prime factor form for the higher primes and powers.

## Exercise 8.1: FIA with Odd Limit 11 (Powers of 1)

We compute S(N) = Σ(1/σ(n)³) using the FIA restricted to primes {2,3,5,7,11} with powers up to 1.

### Step 1: Define the Caret Product Box

The caret product with powers of 1 only:

M = \{1, 2\} ^ \{1, 3\} ^ \{1, 5\} ^ \{1, 7\} ^ \{1, 11\}

Expanding this box gives us all products of the form 2^a · 3^b · 5^c · 7^d · 11^e where a,b,c,d,e ∈ \{0,1\}.

This yields 2^5 = 32 distinct natural numbers:

M = \{1, 2, 3, 5, 6, 7, 10, 11, 14, 15, 21, 22, 30, 33, 35, 42, 55, 66, 70, 77, 105, 110, 154, 165, 210, 231, 330, 385, 462, 770, 1155, 2310\}

### Step 2: Complete Computation

<SODTable primes={[2, 3, 5, 7, 11]} powers={1} columns={4} />

**Note:** The 32-element box M with odd limit 11 (powers of 1) gives a slightly tighter lower bound compared to Wildberger's example using \{2,3,5,7\} with powers up to 2 (81 elements), despite having fewer elements. This demonstrates how the choice of prime restriction affects the approximation quality.

## Exercise 8.2: FIA with Odd Limit 11 (Powers up to 2)

Now we compute S(N) = Σ(1/σ(n)³) using the FIA restricted to primes \{2,3,5,7,11\} with powers up to 2.

### Step 1: Define the Caret Product Box

The caret product with powers up to 2:

M = \{1, 2, 4\} ^ \{1, 3, 9\} ^ \{1, 5, 25\} ^ \{1, 7, 49\} ^ \{1, 11, 121\}

Expanding this box gives us all products of the form 2^a · 3^b · 5^c · 7^d · 11^e where a,b,c,d,e ∈ \{0,1,2\}.

This yields 3^5 = 243 distinct natural numbers (max element: 4 · 9 · 25 · 49 · 121 = 5,336,100).

### Step 2: Complete Computation

<SODTable primes={[2, 3, 5, 7, 11]} powers={2} columns={4} />

**Comparison:** With powers up to 2, we get 243 elements vs 32 elements with powers of 1. The larger box captures more of the sum, giving us a tighter lower bound and demonstrating how increasing the power limit improves the approximation at the cost of more computation.




<DocImg src="/img/primes-and-perfect-numbers.jpg" style={{maxWidth: '100%'}} />



<DocImg src="/img/fia-wildberger.png" style={{maxWidth: '100%'}} />


<DocImg src="/img/partch-tonality-diamond.png" style={{maxWidth: '100%'}} />


<DocImg src="/img/partch-tonality-28.png" style={{maxWidth: '100%'}} />
