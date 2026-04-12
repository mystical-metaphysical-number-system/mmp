declare global {
  interface Math {
    /**
     * The golden ratio (φ or phi).
     * Approximately 1.618033988749895.
     */
    readonly PHI: number;
  }
}

const phi = (1 + Math.sqrt(5)) / 2;

if (!('PHI' in Math)) {
  Object.defineProperty(Math, 'PHI', {
    value: phi,
    enumerable: false,
    configurable: false,
    writable: false,
  });
}

export {};
