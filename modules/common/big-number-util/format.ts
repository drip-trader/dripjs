import { BigNumber } from 'bignumber.js';

import { getBigNumber } from './get-big-number';

/**
 * get floored number by specific decimal places.
 *
 * @param {number} value - number to floor.
 * @param {number} decimalPlace - where to floor.
 * @returns {number}
 */
export function floorByDigit(value: BigNumber.Value, decimalPlace: number = 0): number {
  const bigNumber = getBigNumber(value);

  // fix number with priceDigit (0.123456 -> 0.1234)
  const characteristic = getBigNumber(10).pow(decimalPlace);
  // If input is specified as a number greater than 15 digits,
  // it will result in an error so cast once to string.
  // @see https://github.com/MikeMcl/bignumber.js/issues/148
  const multiplied = bigNumber.multipliedBy(characteristic);

  return multiplied
    .integerValue(BigNumber.ROUND_FLOOR)
    .dividedBy(characteristic)
    .toNumber();
}

/**
 * Fix value with provided digits.
 *
 * @param value
 * @param digits
 */
export function fixByDigits(value: BigNumber.Value, digits: number): string {
  const bn = getBigNumber(value);

  return bn.toFixed(digits);
}
