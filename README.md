# mmp — Mystical Metaphysical Number System

Documentation site for the MMP project, built with [Docusaurus](https://docusaurus.io/).

The site covers the mathematical foundation ([Wildberger's Box Arithmetic](https://web.maths.unsw.edu.au/~norman/)), its TypeScript and Solidity implementations, and a series of encoding guides showing how familiar mathematical and financial structures map onto the box arithmetic substrate.

## Local development

```bash
npm install
npm start       # dev server with live reload at http://localhost:3000
npm run build   # production build → build/
```

## Structure

```
docs/
├── BoxMath/
│   ├── BoxMathSDK.md          # API overview and PDF relationship table
│   ├── API/
│   │   ├── Typescript.md      # boxmath package reference
│   │   └── Solidity.md        # BoxMath.sol + PixelMath.sol reference
│   └── Encoding/
│       ├── 1-NaturalNumbers.md     # zero, boxes, primes, why whole numbers first
│       ├── 2-PolynumberTerm.md     # polynumber concept + API
│       ├── 3-Incommensurability.md
│       ├── 4-Multivariate.md
│       ├── 5-Logic.md
│       ├── 6-Transfer.md       # tax transfer, caller-proposes pattern
│       ├── 7-ConstantProduct.md # AMM invariant without division
│       ├── 8-Truncation.md     # degree bounds, field homogeneity
│       ├── 9-BalancerHack.md   # rounding exploit case study
│       ├── 10-LinearAlgebra.md # pixels, vexels, maxels
│       └── 11-PixelRouter.md   # multi-hop routing via pixel algebra
```

## Source repos

| Repo | Description |
|------|-------------|
| [mystical-metaphysical-number-system/boxmath](https://github.com/mystical-metaphysical-number-system/boxmath) | TypeScript `bigint` implementation |
| [mystical-metaphysical-number-system/hardhat](https://github.com/mystical-metaphysical-number-system/hardhat) | Solidity contracts + Hardhat 3 test suite |
