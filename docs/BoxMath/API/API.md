---
sidebar_position: 3
---

# API Reference

The BoxMath SDK ships two isomorphic implementations of the same primitives:

| Package | Language | Arithmetic |
|---------|----------|------------|
| `boxmath` (`boxmath/src/`) | TypeScript | `bigint` — exact integers |
| `BoxMath.sol` (`hardhat/contracts/`) | Solidity | `uint256` — exact integers |

Both use **pure integer arithmetic** — no fixed-point scaling, no `SCALE` constant. Coefficients, exponents, and evaluation results are raw natural numbers in every case. The hardhat test suite verifies the two produce identical results for every operation.

- [TypeScript API](./Typescript) — `Monomial`, `MultiPoly`, `pow`, `caretProduct`
- [Solidity API](./Solidity) — `BoxMath.sol` contract functions and struct types
