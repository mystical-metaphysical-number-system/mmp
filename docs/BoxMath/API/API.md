---
sidebar_position: 3
---

# API Reference

The BoxMath SDK ships two isomorphic implementations of the same primitives:

| Package | Source | Language | Arithmetic |
|---------|--------|----------|------------|
| `boxmath` | [mystical-metaphysical-number-system/boxmath](https://github.com/mystical-metaphysical-number-system/boxmath) | TypeScript | `bigint` — exact integers |
| `BoxMath.sol` | [mystical-metaphysical-number-system/hardhat](https://github.com/mystical-metaphysical-number-system/hardhat) | Solidity | `uint256` — exact integers |
| `PixelMath.sol` | [mystical-metaphysical-number-system/hardhat](https://github.com/mystical-metaphysical-number-system/hardhat) | Solidity | `uint256` — exact integers |

Both use **pure integer arithmetic** — no fixed-point scaling, no `SCALE` constant. Coefficients, exponents, and evaluation results are raw natural numbers in every case. The hardhat test suite verifies the two produce identical results for every operation.

- [TypeScript API](./Typescript.md) — `Polynumber`, `Multinumber`, `pow`, `caretProduct`, `Pixel`, `Vexel`
- [Solidity API](./Solidity.md) — `BoxMath.sol` and `PixelMath.sol` contract functions and struct types
