---
sidebar_position: 7
---

# Memristors

A **memristor** (memory resistor) is a two-terminal circuit element whose resistance depends on the history of current that has passed through it. It was theorized by Leon Chua in 1971 and first physically realized by HP Labs in 2008. Unlike a resistor (which has fixed resistance), a memristor retains a state — it remembers how much charge has flowed, and its resistance reflects that history.

## The Hysteresis Loop

The defining characteristic of a memristor is its **hysteresis loop** — a pinched figure-eight in the current-voltage plane. When no current flows, the device sits at the crossing point of the loop: zero voltage, zero current, but with a stored internal state (the memristance) that encodes everything that happened before.

This crossing point is the key. At $V = 0$, $I = 0$, the memristor appears identical to an open circuit — but it is not. It carries hidden information in its resistance state. **Zero current does not mean zero information.**

## MMP's Reading

In MMP, this is precisely the behavior of the null $\{\}$: an object that appears to be "nothing" but encodes the history of the oriented poles that produced it. The memristor's zero-crossing is the physical instantiation of MMP's cancellation:

$$
\{\}_- + \{\}_+ = \{\} \quad \text{(oriented states cancel to null — but the history remains)}
$$

The memristance at the zero-crossing is the "orientation information" that survives cancellation. The device is at null, but it knows which direction it came from.

## The Quaternary Unit Cell

A memristor with two stable resistance states (high and low) is a binary device. But the hysteresis loop suggests a richer structure: there are four quadrants, two crossings, and the device behaves differently depending on whether it is approaching zero from positive or negative current. This is the MMP trinary of the void — $\{\}_+$, $\{\}_-$, and null at the crossing — plus the direction of approach.

The proposed **quaternary unit cell** treats each memristor not as a bit (two states) but as an oriented void (three states with directional memory). This maps directly onto the MMP trinary structure and suggests an analog computing architecture in which the unit of information is an oriented zero rather than a binary digit.

_TODO: formalize the mapping between memristor state transitions and ouroboros operator compositions_
