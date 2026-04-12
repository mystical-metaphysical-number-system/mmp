---
sidebar_position: 5
---

# Smart Contracts

Blockchains are deterministic — every node must compute the same result. This rules out floating-point arithmetic entirely: floating-point results can differ between hardware implementations, compiler versions, and rounding modes. Smart contracts on Ethereum and similar platforms work exclusively in integers, typically representing value in the smallest unit (wei, satoshi) and requiring all division to be integer division.

This is a reasonable engineering decision. It is also a partial solution that introduces its own class of error.

## Integer Division and Precision Loss

When a smart contract divides $1$ token among $3$ participants, it must choose: truncate to $0$ each, or round somehow, or revert the transaction. Solidity truncates. The missing $\frac{1}{3}$ is simply lost — precision is sacrificed at every division that doesn't come out even.

Over time, across many transactions, these truncations accumulate. In a protocol that compounds interest, distributes fees, or rebalances proportionally, integer truncation errors compound in ways that systematically disadvantage small holders and create exploitable rounding inconsistencies.

## MMP's Contribution

MMP frames this as a base-selection problem. The error is not inherent to division — it is a consequence of choosing a base (decimal, or binary integers) whose prime factors don't cover the denominators you need.

If a protocol distributes to $3$ participants, it needs $3$ as a prime factor of its base unit. If it uses harmonic fee curves, it needs whatever primes appear in those ratios. The correct approach is to choose the unit of account — the "atomic" value — such that all expected denominators are covered. This is the MMP analogue of choosing the right base: pick the unit whose prime factorization matches the domain.

_TODO: work through a concrete example — a fee distribution contract, an AMM rebalancing step — and show the error explicitly_
