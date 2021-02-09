import { MINIMUM_REMAINING_NUM } from '../../constants';

/**
 * 验证可用余额
 * @param remaining
 */
export function validateRemaining(remaining: number): void {
  if (remaining < MINIMUM_REMAINING_NUM) {
    throw new Error(`The remaining(${remaining}) is less than ${MINIMUM_REMAINING_NUM}`);
  }
}
