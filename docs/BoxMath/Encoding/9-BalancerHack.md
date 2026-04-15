---
sidebar_position: 9
---

# 9. Case Study: The Balancer V2 Hack

On November 3 2025, an attacker drained **$128.64 million** from Balancer V2's ComposableStablePool contracts across six networks in under 30 minutes. The root cause was a rounding error in the pool's upscaling function — not a logic bug, not a reentrancy, not a missing access check. The arithmetic itself was used as a weapon.

## What happened

Balancer V2 stores all tokens in a single Vault. Pools with different-decimal tokens (e.g. USDC at $10^6$, wETH at $10^{18}$) must normalize them to a common 18-decimal representation before computing the StableSwap invariant $D$. This normalization is done by `_upscaleArray`:

```solidity
// Balancer V2 — simplified
function _upscaleArray(uint256[] memory amounts, uint256[] memory scalingFactors)
    private pure returns (uint256[] memory) {
    for (uint256 i = 0; i < amounts.length; i++) {
        amounts[i] = FixedPoint.mulDown(amounts[i], scalingFactors[i]);
        //           ^^^^^^^^^^^^^^^^ rounds DOWN: (amount * factor) / 1e18
    }
    return amounts;
}
```

`mulDown` is a fixed-point multiply that divides by $10^{18}$ and truncates. When a token balance is pushed to the 8–9 wei range, `mulDown` rounds off a significant fraction — up to ~10% relative error per operation. The BPT price is $D / \text{totalSupply}$; an underestimated $D$ means an underestimated BPT price.

The attacker's three-phase loop, repeated **65 times atomically** in a single `batchSwap` constructor call:

1. **Push** one token balance to the rounding boundary (8–9 wei) via BPT redemption
2. **Trigger** `mulDown` precision loss → $D$ underestimated → BPT price drops
3. **Extract** by minting BPT at suppressed price, redeeming at full value

Each individual `mulDown` was safe in the SafeMath sense — no overflow. The exploit lives entirely in the **composition** of 65 individually-valid operations accumulating tiny errors into a catastrophic invariant collapse. See the full [Check Point Research writeup](https://research.checkpoint.com/2025/how-an-attacker-drained-128m-from-balancer-through-rounding-error-exploitation/) for the transaction-level detail.

---

## The root cause: division in the invariant path

The upscaling step exists because USDC (6 decimals) and wETH (18 decimals) live in different integer fields. Bridging them requires a multiply-then-divide:

```solidity
mulDown(amount, 1e12) = (amount * 1e12) / 1e18 = amount / 1e6
```

For any `amount < 1e6` (less than 1 full USDC), this rounds to **zero**:

```solidity
// hardhat/contracts/VulnerablePool.sol
function upscale(uint256 amount) public pure returns (uint256) {
    return mulDown(amount, SCALING_FACTOR); // = amount / 1e6
}
```

```ts
// hardhat/test/BalancerHack.ts
expect(await vuln.upscale(9n)).to.equal(0n);         // 9 / 1e6 = 0
expect(await vuln.upscale(999_999n)).to.equal(0n);   // 999999 / 1e6 = 0
expect(await vuln.upscale(1_000_000n)).to.equal(1n); // exactly 1 USDC
```

The invariant is then `upscale(reserve0) * reserve1`. When `reserve0 < 1e6`, the invariant collapses to **zero** — regardless of how much token1 is in the pool.

---

## The exploit sequence

```solidity
// hardhat/contracts/VulnerablePool.sol
function invariantOf(uint256 r0, uint256 r1) public pure returns (uint256) {
    return upscale(r0) * r1;  // = 0 when r0 < 1e6
}
```

1. **Pool initialised** — 1000 USDC ($10^9$ raw), 1 ETH. `k = upscale(1e9) * 1e18 = 1000 * 1e18`.

2. **BPT redemption** drives `reserve0` to 9 wei. `k` is recomputed: `upscale(9) * 1e18 = 0`.

3. **Drain** — attacker calls `swap(0, reserve1 - 1)`. Check: `invariantOf(9, 1) = 0 >= 0 = k`. Passes. All token1 extracted for free.

```ts
// hardhat/test/BalancerHack.ts
await vuln.redeemBPT(9n);
expect(await vuln.k()).to.equal(0n);          // invariant has collapsed

await vuln.connect(attacker).swap(0n, R1 - 1n); // drains pool — passes!
expect(await vuln.reserve1()).to.equal(1n);    // token1 gone
```

The 65-iteration version accumulates this across 65 micro-cycles, each shaving off a rounding loss:

```ts
// 65 steps each at 1.5 USDC-units: expected upscale=2, actual=1, loss=1 per step
let accumulated = 0n;
for (let i = 0; i < 65; i++) {
  accumulated += 2n - await vuln.upscale(1_500_000n); // 1 per iteration
}
expect(accumulated).to.equal(65n);
```

---

## Why `SafePool` is immune

`SafePool` uses `BoxMath.evaluateMonomial` — two multiplications, no division, no upscaling:

```solidity
// hardhat/contracts/SafePool.sol
function _invariant(uint256 r0, uint256 r1) internal view returns (uint256) {
    // k = r0 * r1  (exact natural number product)
    return _math.evaluateMonomial(BoxMath.Monomial(1, exps), point);
}
```

Token0 and token1 are held at their **native scale**. There is no bridging step. A reserve of 9 raw units contributes exactly `9` to the product — never zero:

```ts
// hardhat/test/BalancerHack.ts
expect(await safe.k()).to.equal(R0 * R1);  // exact, no rounding

// BoxMath at reserve0=9: 9 * R1 — not 0
expect(await bm.evaluateMonomial(xy, [9n, R1])).to.equal(9n * R1);
```

The same drain attempt is caught at two levels:

```ts
await expect(safe.connect(attacker).swap(0n, R1 - 1n))
  .to.be.revertedWith("zero input");       // guard 1: no free swaps

await expect(safe.connect(attacker).swap(1n, R1 - 1n))
  .to.be.revertedWith("invariant violated"); // guard 2: 1 * 1 < R0 * R1
```

---

## Summary

| | `VulnerablePool` | `SafePool` |
|---|---|---|
| Decimal normalisation | `mulDown` — divides, rounds down | none — native scale throughout |
| Invariant at `reserve0 = 9` | `upscale(9) * R1 = 0` | `9 * R1 ≠ 0` |
| k after rounding boundary | **collapses to 0** | unchanged |
| Drain with 0 input | passes (`0 >= 0`) | reverts (`zero input`) |
| Drain with 1 wei input | passes (k=0) | reverts (`invariant violated`) |
| SafeMath fires | no | no |
| Root cause | division in hot path | — |

The field inhomogeneity between USDC and wETH is real. Box arithmetic does not pretend it doesn't exist — it simply never introduces a division step to bridge it. The invariant is defined over natural numbers at mixed scale, and the cross-multiplication structure of [§5](./5-Logic.md) and [§6](./6-Transfer.md) extends to handle any proportion between them without rounding.
