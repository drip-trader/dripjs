import { fixByDigits, floorByDigit } from './format';

describe('floorByDigit', () => {
  describe('btc_jpy pair:', () => {
    let priceDigit: number;

    beforeEach(() => {
      priceDigit = 0;
    });

    it('should return floored value #1', () => {
      const value = 808138;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(808138);
    });

    it('should return floored value #2', () => {
      const value = 808138.5;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(808138);
    });
  });

  describe('xrp_jpy pair:', () => {
    let priceDigit: number;

    beforeEach(() => {
      priceDigit = 3;
    });

    it('should return floored value #1', () => {
      const value = 64.655;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(64.655);
    });

    it('should return floored value #2', () => {
      const value = 64.6;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(64.6);
    });

    it('should return floored value #3', () => {
      const value = 64.6558;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(64.655);
    });
  });

  describe('ltc_btc pair:', () => {
    let priceDigit: number;

    beforeEach(() => {
      priceDigit = 8;
    });

    it('should return floored value #1', () => {
      const value = 0.01598311;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(0.01598311);
    });
  });

  describe('eth_btc pair:', () => {
    let priceDigit: number;

    beforeEach(() => {
      priceDigit = 8;
    });

    it('should return floored value #1', () => {
      const value = 0.07678989;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(0.07678989);
    });
  });

  describe('mona_jpy pair:', () => {
    let priceDigit: number;

    beforeEach(() => {
      priceDigit = 3;
    });

    it('should return floored value #1', () => {
      const value = 366.897;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(366.897);
    });
  });

  describe('mona_btc pair:', () => {
    let priceDigit: number;

    beforeEach(() => {
      priceDigit = 8;
    });

    it('should return floored value #1', () => {
      const value = 0.000454;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(0.000454);
    });
  });

  describe('bcc_jpy pair:', () => {
    let priceDigit: number;

    beforeEach(() => {
      priceDigit = 0;
    });

    it('should return floored value #7', () => {
      const value = 107999;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(107999);
    });
  });

  describe('bcc_btc pair:', () => {
    let priceDigit: number;

    beforeEach(() => {
      priceDigit = 8;
    });

    it('should return floored value #8', () => {
      const value = 0.13387562;

      const result = floorByDigit(value, priceDigit);
      expect(result).toBeTruthy();
      expect(result).toBe(0.13387562);
    });
  });
});

describe('fixByDigits', () => {
  describe('When proper values are provided', () => {
    it('should calculate values properly', () => {
      const base = '0.001';
      expect(fixByDigits(base, 1)).toBe('0.0');
      expect(fixByDigits(base, 2)).toBe('0.00');
      expect(fixByDigits(base, 3)).toBe('0.001');
      expect(fixByDigits(base, 4)).toBe('0.0010');
    });

    it('should round values', () => {
      const base = '0.009';
      expect(fixByDigits(base, 2)).toBe('0.01');
    });
  });
});
