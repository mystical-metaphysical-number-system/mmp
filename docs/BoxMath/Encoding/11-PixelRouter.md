---
sidebar_position: 11
---

# 11. Case Study: Pixel-Algebraic Route Validation

Multi-hop swaps are one of the most common operations in DeFi. Routing USDC → BTC through an intermediate ETH pool requires the router to verify that the output token of each hop equals the input token of the next — a **path connectivity** check.

In existing routers (Uniswap V3, 1inch, CoW Protocol), this is done by encoding the path as raw bytes (`abi.encodePacked(tokenA, fee, tokenB, fee, tokenC)`) and asserting token equality at each hop with explicit `require` statements. The check is correct, but it is not algebraic — there is no compact representation of the route as a whole, no way to compose partial routes, and no structural type that distinguishes a valid path from an arbitrary list of hops.

Pixel algebra gives all three for free.

---

## The key insight

Assign each token a natural number index. A pool hop from token $m$ to token $n$ is the pixel $[m, n]$.

The pixel product encodes path connectivity:

$$
[m, n] \cdot [n, q] = [m, q] \qquad \text{(valid: inner indices match)}
$$
$$
[m, n] \cdot [p, q] = \text{nothing} \qquad \text{(broken: } n \neq p \text{)}
$$

A 2-hop route USDC → ETH → BTC collapses to a single pixel $[USDC, BTC]$:

$$
[\text{USDC}, \text{ETH}] \cdot [\text{ETH}, \text{BTC}] = [\text{USDC}, \text{BTC}]
$$

The output pixel is a **structural certificate**: it tells you the source and destination of the full route without carrying intermediate tokens. Any break in the chain produces nothing — not a wrong answer, but no answer at all.

---

## Comparison with Uniswap V3 path encoding

| Property | Uniswap V3 | PixelRouter |
|----------|-----------|-------------|
| Route representation | `bytes` (packed addresses + fees) | `Pixel[]` |
| Validity check | `require(tokenOut == nextTokenIn)` at each hop | `pixelProduct` returns `ok = false` |
| Route summary | None — full path must be carried | Single pixel `[source, dest]` |
| Composability | Concatenate byte strings | `pixelProduct` of summary pixels |
| Partial route pre-validation | Not possible | Associativity allows pre-composing segments |

---

## `PixelRouter.sol`

`PixelRouter.sol` inherits from `PixelMath.sol` and adds two registries:

- **Token registry**: maps a token address to its natural-number index
- **Pool registry**: maps a pixel `[from, to]` to a pool address

`validateRoute` enforces both structural connectivity (pixel algebra) and liquidity existence (pool registry):

```solidity
function validateRoute(Pixel[] memory hops)
    public view returns (Pixel memory route)
{
    require(hops.length >= 1, "empty route");

    for (uint256 i = 0; i < hops.length; i++) {
        require(pool[hops[i].m][hops[i].n] != address(0), "no pool for hop");
    }

    route = hops[0];
    for (uint256 i = 1; i < hops.length; i++) {
        (bool ok, Pixel memory next) = pixelProduct(route, hops[i]);
        require(ok, "broken path");
        route = next;
    }
}
```

The two `require` conditions are independent:
- `no pool for hop` — the hop exists structurally but no liquidity backs it
- `broken path` — the hop sequence is not connected (pixel algebra rejects it)

---

## Tests

```ts
// Token indices: USDC=1, ETH=2, BTC=3

// Single hop
const route = await router.validateRoute([{ m: 1n, n: 2n }]);
// route = { m: 1n, n: 2n }  — source USDC, dest ETH

// 2-hop: USDC → ETH → BTC
const route = await router.validateRoute([
  { m: 1n, n: 2n },  // USDC → ETH
  { m: 2n, n: 3n },  // ETH  → BTC
]);
// pixelProduct chains: route = { m: 1n, n: 3n }  — source USDC, dest BTC

// Broken path: [1,2]·[3,4] — inner indices 2 ≠ 3
await router.validateRoute([{ m: 1n, n: 2n }, { m: 3n, n: 4n }]);
// reverts: "broken path"

// Missing pool: no [1,3] USDC→BTC direct pool registered
await router.validateRoute([{ m: 1n, n: 3n }]);
// reverts: "no pool for hop"
```

---

## Why associativity matters

The pixel product is associative:

$$
([A, B] \cdot [B, C]) \cdot [C, D] = [A, B] \cdot ([B, C] \cdot [C, D]) = [A, D]
$$

This means a long route can be split into segments, each validated independently, and the summary pixels composed later:

```ts
// Pre-validate leg 1: USDC → ETH → BTC  → summary [1,3]
const leg1 = await router.validateRoute([{ m: 1n, n: 2n }, { m: 2n, n: 3n }]);

// Pre-validate leg 2: BTC → WBTC         → summary [3,4]
const leg2 = await router.validateRoute([{ m: 3n, n: 4n }]);

// Compose summaries: [1,3]·[3,4] = [1,4]
const [ok, full] = await pm.pixelProduct(leg1, leg2);
// ok = true, full = { m: 1n, n: 4n }  — USDC to WBTC
```

A Uniswap V3-style bytes path has no equivalent of this. The full path must always be present and decoded end-to-end. Pixel algebra gives you a **composable type for routes**.
