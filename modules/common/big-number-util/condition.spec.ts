import {
  equal,
  equalStrictly,
  gt,
  gtStrictly,
  gte,
  gteStrictly,
  isFinite,
  isFiniteStrictly,
  isNaN,
  isNegative,
  isNegativeStrictly,
  isPositive,
  isPositiveStrictly,
  isZero,
  isZeroStrictly,
  lt,
  ltStrictly,
  lte,
  lteStrictly,
} from './condition';

describe('BigNumber Util Condition Functions', () => {
  describe('equal', () => {
    it('should handle value as expected', () => {
      expect(equal(1, 1)).toBe(1 === 1);
    });
    it('should return false whenever non numeric value', () => {
      expect(equal(NaN, NaN)).toBe(false);
      expect(equal(<any>null, 1)).toBe(false);
    });
  });

  describe('gt', () => {
    it('should handle value as expected', () => {
      expect(gt(2, 1)).toBe(2 > 1);
    });
    it('should return false whenever non numeric value', () => {
      expect(gt(<any>null, 1)).toBe(false);
    });
  });

  describe('lt', () => {
    it('should handle value as expected', () => {
      expect(lt(1, 2)).toBe(1 < 2);
    });
    it('should return false whenever non numeric value', () => {
      expect(lt(<any>null, 1)).toBe(false);
    });
  });

  describe('gte', () => {
    it('should handle value as expected', () => {
      expect(gte(2, 1)).toBe(2 > 1);
    });
    it('should return false whenever non numeric value', () => {
      expect(gte(<any>null, 1)).toBe(false);
    });
  });

  describe('lte', () => {
    it('should handle value as expected', () => {
      expect(lte(1, 2)).toBe(1 < 2);
    });
    it('should return false whenever non numeric value', () => {
      expect(lte(<any>null, 1)).toBe(false);
    });
  });

  describe('isPositive', () => {
    it('should handle value as expected', () => {
      expect(isPositive(1)).toBe(0 < 1);
    });
    it('should return false whenever non numeric value', () => {
      expect(isPositive(<any>null)).toBe(false);
    });
  });

  describe('isNegative', () => {
    it('should handle value as expected', () => {
      expect(isNegative(-1)).toBe(-1 < 0);
    });
    it('should return false whenever non numeric value', () => {
      expect(isNegative(<any>null)).toBe(false);
    });
  });

  describe('isZero', () => {
    it('should handle value as expected', () => {
      expect(isZero(0)).toBe(0 === 0);
    });
    it('should return false whenever non numeric value', () => {
      expect(isZero(<any>null)).toBe(false);
    });
  });

  describe('isFinite', () => {
    it('should handle value as expected', () => {
      expect(isFinite(1)).toBe(Number.isFinite(1));
    });
    it('should return false whenever non numeric value', () => {
      expect(isFinite(<any>null)).toBe(false);
    });
  });

  describe('isNaN', () => {
    it('should handle value as expected', () => {
      expect(isNaN(NaN)).toBe(Number.isNaN(NaN));
    });
  });

  describe('equalStrictly', () => {
    it('should handle value as expected', () => {
      expect(equalStrictly(1, 1)).toBe(1 === 1);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => equalStrictly(<any>null, 1)).toThrow();
      expect(() => equalStrictly(<any>NaN, 1)).toThrow();
    });
  });

  describe('gtStrictly', () => {
    it('should handle value as expected', () => {
      expect(gtStrictly(2, 1)).toBe(2 > 1);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => gtStrictly(<any>null, 1)).toThrow();
    });
  });

  describe('ltStrictly', () => {
    it('should handle value as expected', () => {
      expect(ltStrictly(1, 2)).toBe(1 < 2);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => ltStrictly(<any>null, 1)).toThrow();
    });
  });

  describe('gteStrictly', () => {
    it('should handle value as expected', () => {
      expect(gteStrictly(2, 1)).toBe(2 > 1);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => gteStrictly(<any>null, 1)).toThrow();
    });
  });

  describe('lteStrictly', () => {
    it('should handle value as expected', () => {
      expect(lteStrictly(1, 2)).toBe(1 < 2);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => lteStrictly(<any>null, 1)).toThrow();
    });
  });

  describe('isPositiveStrictly', () => {
    it('should handle value as expected', () => {
      expect(isPositiveStrictly(1)).toBe(0 < 1);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => isPositiveStrictly(<any>null)).toThrow();
    });
  });

  describe('isNegativeStrictly', () => {
    it('should handle value as expected', () => {
      expect(isNegativeStrictly(-1)).toBe(-1 < 0);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => isNegativeStrictly(<any>null)).toThrow();
    });
  });

  describe('isZeroStrictly', () => {
    it('should handle value as expected', () => {
      expect(isZeroStrictly(0)).toBe(0 === 0);
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => isZeroStrictly(<any>null)).toThrow();
    });
  });

  describe('isFiniteStrictly', () => {
    it('should handle value as expected', () => {
      expect(isFiniteStrictly(1)).toBe(Number.isFinite(1));
    });
    it('should throw error whenever non numeric value', () => {
      expect(() => isFiniteStrictly(<any>null)).toThrow();
    });
  });
});
