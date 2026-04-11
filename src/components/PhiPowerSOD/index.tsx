import React, { useState } from 'react';

const PHI = (1 + Math.sqrt(5)) / 2;

function primeFactorization(n: number): Map<number, number> {
  const factors = new Map<number, number>();
  if (n === 1) return factors;
  
  let remaining = n;
  for (let p = 2; p * p <= remaining; p++) {
    while (remaining % p === 0) {
      factors.set(p, (factors.get(p) || 0) + 1);
      remaining /= p;
    }
  }
  if (remaining > 1) {
    factors.set(remaining, 1);
  }
  return factors;
}

function formatPrimeFactorization(n: number): string {
  if (n === 1) return '1';
  const factors = primeFactorization(n);
  const parts: string[] = [];
  for (const [prime, power] of Array.from(factors.entries()).sort((a, b) => a[0] - b[0])) {
    if (power === 1) {
      parts.push(`${prime}`);
    } else {
      parts.push(`${prime}^${power}`);
    }
  }
  return parts.join('·');
}

function generateCaretBox(primes: number[], maxPower: number = 1): number[] {
  const box: number[] = [1];
  
  for (const prime of primes) {
    const newElements: number[] = [];
    for (let power = 1; power <= maxPower; power++) {
      const primePower = Math.pow(prime, power);
      for (const existing of box) {
        newElements.push(existing * primePower);
      }
    }
    box.push(...newElements);
  }
  
  return box.sort((a, b) => a - b);
}

function computeRpTransform(prime: number, maxPower: number): {
  elements: number[];
  phiValues: number[];
  transformedValues: number[];
  f: number;
} {
  const elements: number[] = [];
  const phiValues: number[] = [];
  const transformedValues: number[] = [];
  
  for (let k = 0; k <= maxPower; k++) {
    const pk = Math.pow(prime, k);
    elements.push(pk);
    const phiPower = Math.pow(PHI, 3 * pk);
    phiValues.push(phiPower);
    const transformed = 1 / phiPower;
    transformedValues.push(transformed);
  }
  
  const f = transformedValues.reduce((sum, val) => sum + val, 0);
  
  return { elements, phiValues, transformedValues, f };
}

interface PhiPowerSODTableProps {
  primes?: number[];
  powers?: number;
}

export default function PhiPowerSODTable({ 
  primes = [2, 3, 5, 7, 11], 
  powers = 1
}: PhiPowerSODTableProps) {
  const [showFactorization, setShowFactorization] = useState(false);
  
  const M = generateCaretBox(primes, powers);
  
  const pairs = M.map(n => ({
    n,
    phiPower: Math.pow(PHI, 3 * n),
    nFactored: formatPrimeFactorization(n)
  }));
  
  const rpData = primes.map(p => computeRpTransform(p, powers));
  const lowerBound = rpData.reduce((product, rp) => product * rp.f, 1);
  
  // Theoretical exact value: 1/(φ³ - 1)
  const theoreticalValue = 1 / (Math.pow(PHI, 3) - 1);
  
  // Upper bound using geometric series: sum of remaining terms
  const maxN = M[M.length - 1];
  const upperBound = lowerBound + (1 / Math.pow(PHI, 3 * (maxN + 1))) / (1 - 1/Math.pow(PHI, 3));
  const intervalWidth = upperBound - lowerBound;
  
  return (
    <div>
      <p>
        <strong>Caret Box M:</strong> {'{'}{primes.join(', ')}{'}'} with powers up to {powers}
        <br />
        <strong>Size:</strong> {M.length} elements (max element: {M[M.length - 1]})
        <br />
        <strong>φ = (1+√5)/2 ≈</strong> {PHI.toFixed(8)}
      </p>
      
      <button 
        onClick={() => setShowFactorization(!showFactorization)}
        style={{
          marginBottom: '0.5rem',
          padding: '0.4rem 0.8rem',
          fontSize: '0.85em',
          cursor: 'pointer',
          border: '1px solid #4a90e2',
          borderRadius: '4px',
          backgroundColor: 'transparent',
          color: '#4a90e2'
        }}
      >
        {showFactorization ? 'Show as Numbers' : 'Show Prime Factorization'}
      </button>
      
      <div style={{
        fontSize: '0.85em',
        lineHeight: '1.6',
        fontFamily: 'monospace',
        marginBottom: '1rem'
      }}>
        {pairs.map((p, idx) => (
          <span key={idx}>
            {'{'}
            {showFactorization ? p.nFactored : p.n}, {p.phiPower.toExponential(4)}
            {'}'}
            {idx < pairs.length - 1 && ', '}
          </span>
        ))}
      </div>
      
      <div style={{marginTop: '2rem'}}>
        <h4>R(p) Transformations and Lower Bound Computation</h4>
        <table style={{fontSize: '0.85em'}}>
          <thead>
            <tr>
              <th style={{padding: '0.25rem 0.5rem'}}>Prime p</th>
              <th style={{padding: '0.25rem 0.5rem'}}>Box Elements</th>
              <th style={{padding: '0.25rem 0.5rem'}}>φ^(3n) Values</th>
              <th style={{padding: '0.25rem 0.5rem'}}>1/φ^(3n) Values</th>
              <th style={{padding: '0.25rem 0.5rem'}}>f(p) = Σ(1/φ^(3n))</th>
            </tr>
          </thead>
          <tbody>
            {rpData.map((rp, idx) => (
              <tr key={idx} style={{backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(128, 128, 128, 0.15)'}}>
                <td style={{textAlign: 'center', padding: '0.2rem 0.5rem'}}>{primes[idx]}</td>
                <td style={{padding: '0.2rem 0.5rem'}}>{'{'}{rp.elements.join(', ')}{'}'}</td>
                <td style={{padding: '0.2rem 0.5rem', fontSize: '0.85em'}}>
                  {'{'}{rp.phiValues.map(v => v.toExponential(2)).join(', ')}{'}'}</td>
                <td style={{padding: '0.2rem 0.5rem', fontSize: '0.9em'}}>
                  {'{'}{rp.transformedValues.map(v => v.toFixed(6)).join(', ')}{'}'}</td>
                <td style={{textAlign: 'right', padding: '0.2rem 0.5rem'}}>{rp.f.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <p style={{marginTop: '1rem', fontSize: '0.9em'}}>
          <strong>Lower Bound t = </strong>
          {rpData.map((rp, idx) => (
            <span key={idx}>
              {idx > 0 && ' × '}
              f({primes[idx]})
            </span>
          ))}
          {' ≈ '}
          <strong>{lowerBound.toFixed(8)}</strong>
        </p>
        
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          borderLeft: '4px solid #4a90e2',
          borderRadius: '4px'
        }}>
          <h4 style={{marginTop: 0}}>Interval Result</h4>
          <p>
            <strong>Theoretical Exact Value:</strong> 1/(φ³ - 1) = {theoreticalValue.toFixed(8)}
            <br />
            <span style={{fontSize: '0.9em', color: '#666'}}>
              (Closed form for infinite geometric series Σ 1/φ^(3n))
            </span>
          </p>
          <p>
            <strong>Upper Bound u = </strong> {upperBound.toFixed(8)}
            <br />
            <span style={{fontSize: '0.9em', color: '#666'}}>
              (Lower bound + geometric tail starting at n = {maxN + 1})
            </span>
          </p>
          <p>
            <strong>For N ≥ {maxN}:</strong>
          </p>
          <p style={{
            fontSize: '1.2em',
            fontWeight: 'bold',
            margin: '0.5rem 0',
            color: '#2c5282'
          }}>
            S(N) ∈ [{lowerBound.toFixed(6)}, {upperBound.toFixed(6)}]
          </p>
          <p>
            <strong>Interval Width:</strong> {intervalWidth.toFixed(8)} 
            {intervalWidth < 0.1 ? ' ✓ (< 1/10)' : ' (> 1/10)'}
          </p>
          <p>
            <strong>Distance from Exact:</strong> {Math.abs(theoreticalValue - lowerBound).toFixed(8)}
          </p>
        </div>
      </div>
    </div>
  );
}
