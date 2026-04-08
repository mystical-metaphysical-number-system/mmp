import {InlineMath} from 'react-katex';

const PHI = (1 + Math.sqrt(5)) / 2;

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function nBallVolume(n: number, r: number, pi: number = Math.PI): number {
  if (n === 0) return 1;
  if (n === 1) return 2 * r;
  if (n === 2) return pi * r ** 2;
  
  const k = Math.floor(n / 2);
  if (n % 2 === 0) {
    return (pi ** k / factorial(k)) * r ** n;
  } else {
    const doubleFactorial = (m: number): number => {
      if (m <= 0) return 1;
      let result = 1;
      for (let i = m; i > 0; i -= 2) {
        result *= i;
      }
      return result;
    };
    return (2 * factorial(k) * (4 * pi) ** k) / doubleFactorial(n) * r ** n;
  }
}

interface DimensionData {
  dim: number;
  volumeFormulaString: string;
  xPiN: string;
  phiForm: string;
  targetTn: string;
  computeXPiN: () => number;
  computeRealRadius: () => number;
  computeTargetTn: () => number;
}

const dimensionData: DimensionData[] = [
  {
    dim: 0,
    volumeFormulaString: 'x_{\\pi,0} r^0',
    xPiN: '\\phi^0=1',
    phiForm: '(\\phi r)^0',
    targetTn: '\\phi^{3/2}',
    computeXPiN: () => 1,
    computeRealRadius: () => NaN,
    computeTargetTn: () => PHI ** (3 / 2),
  },
  {
    dim: 1,
    volumeFormulaString: '2x_{\\pi,1}r',
    xPiN: '\\phi/2',
    phiForm: '(\\phi r)^1',
    targetTn: '\\phi^{7/4}',
    computeXPiN: () => PHI / 2,
    computeRealRadius: () => 1 / (2 * Math.PI),
    computeTargetTn: () => PHI ** (7 / 4),
  },
  {
    dim: 2,
    volumeFormulaString: 'x_{\\pi,2}r^2',
    xPiN: '\\phi^2',
    phiForm: '(\\phi r)^2',
    targetTn: '\\phi^2/5',
    computeXPiN: () => PHI ** 2,
    computeRealRadius: () => 1 / Math.sqrt(Math.PI),
    computeTargetTn: () => (PHI ** 2) / 5,
  },
  {
    dim: 3,
    volumeFormulaString: '\\frac{4}{3}x_{\\pi,3}r^3',
    xPiN: '3\\phi^3/4',
    phiForm: '(\\phi r)^3',
    targetTn: '\\phi^{-7}',
    computeXPiN: () => (3 * PHI ** 3) / 4,
    computeRealRadius: () => (3 / (4 * Math.PI)) ** (1 / 3),
    computeTargetTn: () => PHI ** -7,
  },
  {
    dim: 4,
    volumeFormulaString: '\\frac{x_{\\pi,4}^2}{2}r^4',
    xPiN: '\\phi^2\\sqrt{2}',
    phiForm: '(\\phi r)^4',
    targetTn: '\\phi^2/5',
    computeXPiN: () => PHI ** 2 * Math.sqrt(2),
    computeRealRadius: () => (2 / Math.PI ** 2) ** 0.25,
    computeTargetTn: () => (PHI ** 2) / 5,
  },
  {
    dim: 5,
    volumeFormulaString: '\\frac{8x_{\\pi,5}^2}{15}r^5',
    xPiN: '\\sqrt{15\\phi^5/8}',
    phiForm: '(\\phi r)^5',
    targetTn: '\\sqrt{2}',
    computeXPiN: () => Math.sqrt((15 * PHI ** 5) / 8),
    computeRealRadius: () => (15 / (8 * Math.PI ** 2)) ** (1 / 5),
    computeTargetTn: () => Math.sqrt(2),
  },
  {
    dim: 6,
    volumeFormulaString: '\\frac{x_{\\pi,6}^3}{6}r^6',
    xPiN: '6^{1/3}\\phi^2',
    phiForm: '(\\phi r)^6',
    targetTn: '\\phi',
    computeXPiN: () => 6 ** (1 / 3) * PHI ** 2,
    computeRealRadius: () => (1 / Math.PI) ** (1 / 3),
    computeTargetTn: () => PHI,
  },
  {
    dim: 7,
    volumeFormulaString: '\\frac{16x_{\\pi,7}^3}{105}r^7',
    xPiN: '(105\\phi^7/16)^{1/3}',
    phiForm: '(\\phi r)^7',
    targetTn: '\\phi^2',
    computeXPiN: () => ((105 * PHI ** 7) / 16) ** (1 / 3),
    computeRealRadius: () => (105 / (16 * Math.PI ** 3)) ** (1 / 7),
    computeTargetTn: () => PHI ** 2,
  },
  {
    dim: 8,
    volumeFormulaString: '\\frac{x_{\\pi,8}^4}{24}r^8',
    xPiN: '24^{1/4}\\phi^2',
    phiForm: '(\\phi r)^8',
    targetTn: '\\phi^2',
    computeXPiN: () => 24 ** (1 / 4) * PHI ** 2,
    computeRealRadius: () => (24 / Math.PI ** 4) ** (1 / 8),
    computeTargetTn: () => PHI ** 2,
  },
];

export default function NSphereTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Dim</th>
          <th>n-volume V<sub>n</sub>=1</th>
          <th>r when x<sub>π,n</sub>=π</th>
          <th>abs(r-1/φ)</th>
          <th>x<sub>π,n</sub> at r=1/φ</th>
          <th>φ form</th>
          <th>abs(x<sub>π,n</sub>-π)</th>
          <th>target t<sub>n</sub></th>
          <th>abs(abs(x<sub>π,n</sub>-π)-t<sub>n</sub>)</th>
        </tr>
      </thead>
      <tbody>
        {dimensionData.map((d) => {
          const xPiN = d.computeXPiN();
          const rReal = d.computeRealRadius();
          const targetVal = d.computeTargetTn();
          const absXPiNMinusPi = Math.abs(xPiN - Math.PI);

          return (
            <tr key={d.dim}>
              <td>{d.dim}D</td>
              <td><InlineMath math={d.volumeFormulaString} /></td>
              <td style={{textAlign: 'right'}}>
                {isNaN(rReal) ? 'n/a' : rReal.toFixed(8)}
              </td>
              <td style={{textAlign: 'right'}}>
                {isNaN(rReal) ? 'n/a' : Math.abs(rReal - 1 / PHI).toFixed(8)}
              </td>
              <td><InlineMath math={d.xPiN} /></td>
              <td><InlineMath math={d.phiForm} /></td>
              <td style={{textAlign: 'right'}}>{absXPiNMinusPi.toFixed(8)}</td>
              <td><InlineMath math={d.targetTn} /></td>
              <td style={{textAlign: 'right'}}>
                {isNaN(targetVal)
                  ? 'n/a'
                  : Math.abs(absXPiNMinusPi - targetVal).toFixed(8)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
