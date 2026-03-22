---
sidebar_position: 7
---

# Memristors

A **memristor** (memory resistor) is a two-terminal circuit element whose resistance depends on the history of current that has passed through it. It was theorized by Leon Chua in 1971 and first physically realized by HP Labs in 2008. Unlike a resistor (which has fixed resistance), a memristor retains a state — it remembers how much charge has flowed, and its resistance reflects that history.

## The Hysteresis Loop

The defining characteristic of a memristor is its **hysteresis loop** — a pinched figure-eight in the current-voltage plane. When no current flows, the device sits at the crossing point of the loop: zero voltage, zero current, but with a stored internal state (the memristance) that encodes everything that happened before.

The loop is bounded by two extreme conditions that define its edges:

**Open circuit** — infinite resistance, zero current. The device blocks all flow; $I = 0$ regardless of $V$. This is the upper boundary of the resistance axis: $R \to \infty$, $I \to 0$.

**Short circuit** — zero resistance, infinite current. The device offers no opposition; $I \to \infty$ for any nonzero $V$. This is the lower boundary: $R \to 0$, $I \to \infty$.

These two conditions are the memristor's mystical numbers. Open circuit is zero current with infinite resistance — length zero, precision infinite. Short circuit is infinite current with zero resistance — infinite length, zero precision. They are the poles of the device, and the hysteresis loop is the path the memristor traces between them.

The crossing point sits exactly between these poles. At $V = 0$, $I = 0$, the memristor appears identical to an open circuit — but it is not. It carries hidden information in its resistance state. **Zero current does not mean zero information.**

## MMP's Reading

In MMP, this is precisely the behavior of the null $\{\}$: an object that appears to be "nothing" but encodes the history of the oriented poles that produced it. The memristor's zero-crossing is the physical instantiation of MMP's cancellation:

$$
\{\}_- + \{\}_+ = \{\} \quad \text{(oriented states cancel to null — but the history remains)}
$$

The memristance at the zero-crossing is the "orientation information" that survives cancellation. The device is at null, but it knows which direction it came from.

## The V-I Diagram as MMP Continuum

The V-I diagram of the memristor is not just a device characteristic — in MMP language it is the full continuum of box arithmetic laid out physically.

The two boundary conditions are both $\{\}$, arrived at from opposite directions:

$$
0 \odot \infty = \{\}_+ \quad \text{(short circuit — } R=0, I=\infty \text{)}
$$
$$
\infty \odot 0 = \{\}_- \quad \text{(open circuit — } R=\infty, I=0 \text{)}
$$

Every point on the hysteresis curve is a ratio of these two voids held in tension. The device's operating range is literally the interior of that dialectic. The **hysteresis loop is the device remembering which direction it traversed the continuum** — the memristor is a physical MMP accumulator.

## The Quaternary Unit Cell

Unity is recovered when the void is nested inside itself — $\{\{\}\} = 1$. In circuit terms, two memristors in series piping one pole into the other instantiate this exactly:

$$
\text{short} \xrightarrow{\{\}_+} \text{[device]} \xrightarrow{\{\}_-} \text{open} \xrightarrow{\odot} \{\{\}\} = 1
$$

The output terminus where the two poles meet is where unity is recovered — the fixed point, the thing that stays the same as everything changes. The two crossbars $G$ and $G^T$ with short piped into one end and open into the other are physically instantiating the cross-composition of the oriented voids.

A binary memristor reads two states (high resistance / low resistance) and discards the directional information. The **quaternary unit cell** preserves it — treating each memristor as an oriented void (three states: $\{\}_+$, $\{\}_-$, null) with directional memory. The information hidden behind zero is not lost; it is encoded in the memristance at the crossing point. The device knows which direction it came from, and that history *is* the computation.

_TODO: formalize the mapping between memristor state transitions and ouroboros operator compositions_
