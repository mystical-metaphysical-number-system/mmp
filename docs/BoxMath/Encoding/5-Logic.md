---
sidebar_position: 5
---

# 5. From Encoding to Logic

The previous pages showed how to *encode* a polynomial as a box. Now we use those boxes to *make assertions* — to check that a condition holds rather than just compute a value.

The simplest such assertion is a **proportion**: $a : b = c : d$. Box arithmetic has no fractions, so it lives entirely as a product identity:

$$
a : b = c : d \quad \Longleftrightarrow \quad a \cdot d = b \cdot c
$$

**Example** — three is to four as six is to eight:

$$
3 \cdot 8 = 4 \cdot 6 = 24
$$

```ts
const ad = new Polynumber(3n, []).evaluate([]) * new Polynumber(8n, []).evaluate([]);
const bc = new Polynumber(4n, []).evaluate([]) * new Polynumber(6n, []).evaluate([]);
ad === bc;  // 24n === 24n  ✓
```

No division, no fraction — just two products that must match. This is the pattern that scales up to invariants: instead of computing a ratio and storing it, define the *relationship* as an equality of natural numbers and check it.

**A proportion in one variable** — if $y$ should be $\tfrac{3}{4}$ of $x$, express it as $4y = 3x$:

```ts
const lhs = new Multinumber([new Polynumber(4n, [0, 1])]);  // 4y
const rhs = new Multinumber([new Polynumber(3n, [1])]);     // 3x

const x = 8n;
const y = 6n;
lhs.evaluate([x, y]) === rhs.evaluate([x, y]);  // 24n === 24n  ✓
```

The division only becomes necessary if you need to *solve* for $y$ given $x$, and then it is exact precisely when $4 \mid 3x$. If you need it exact for all inputs, choose a unit for $x$ that is always a multiple of $4$ — see [Precision vs Exactness](../../Applications/PrecisionVsExactness.md).
