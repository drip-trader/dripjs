import { BigNumber } from 'bignumber.js';

import { getBigNumber, getBigNumberStrictly } from './get-big-number';

export function equal(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumber(v1);
  const b = getBigNumber(v2);

  return a.isEqualTo(b);
}

export function gt(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumber(v1);
  const b = getBigNumber(v2);

  return a.gt(b);
}

export function lt(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumber(v1);
  const b = getBigNumber(v2);

  return a.lt(b);
}

export function gte(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumber(v1);
  const b = getBigNumber(v2);

  return a.gte(b);
}

export function lte(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumber(v1);
  const b = getBigNumber(v2);

  return a.lte(b);
}

export function isPositive(v: BigNumber.Value): boolean {
  const bn = getBigNumber(v);

  return bn.isPositive() && bn.isGreaterThan(0);
}

export function isNegative(v: BigNumber.Value): boolean {
  const bn = getBigNumber(v);

  return bn.isNegative() && bn.isLessThan(0);
}

export function isZero(v: BigNumber.Value): boolean {
  return getBigNumber(v).isZero();
}

export function isFinite(v: BigNumber.Value): boolean {
  return getBigNumber(v).isFinite();
}

export function isNaN(v: BigNumber.Value): boolean {
  return getBigNumber(v).isNaN();
}

export function equalStrictly(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.isEqualTo(b);
}

export function gtStrictly(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.gt(b);
}

export function ltStrictly(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.lt(b);
}

export function gteStrictly(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.gte(b);
}

export function lteStrictly(v1: BigNumber.Value, v2: BigNumber.Value): boolean {
  const a = getBigNumberStrictly(v1);
  const b = getBigNumberStrictly(v2);

  return a.lte(b);
}

export function isPositiveStrictly(v: BigNumber.Value): boolean {
  const bn = getBigNumberStrictly(v);

  return bn.isPositive() && bn.isGreaterThan(0);
}

export function isNegativeStrictly(v: BigNumber.Value): boolean {
  const bn = getBigNumberStrictly(v);

  return bn.isNegative() && bn.isLessThan(0);
}

export function isZeroStrictly(v: BigNumber.Value): boolean {
  return getBigNumberStrictly(v).isZero();
}

export function isFiniteStrictly(v: BigNumber.Value): boolean {
  return getBigNumberStrictly(v).isFinite();
}
