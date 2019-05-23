import * as assert from 'assert';

import { isFunction, isObject } from 'lodash';

export type AssertionType<T> = Partial<Record<keyof T, any>>;

class AssertionError extends Error {}

/**
 * Transform exisiting columns with provided values.
 *
 * @param source
 * @param assertion
 * @param parentKey
 */
export function assertExisitingColumns<T extends any>(source: T, assertion: AssertionType<T>, parentKey: string = ''): void {
  for (const [key, assertionValue] of Object.entries(assertion)) {
    const actualValue = (<any>source)[key];

    try {
      // error can be thrown here.
      if (isFunction(assertionValue)) {
        assert.strictEqual(assertionValue(actualValue), true);
      } else if (isObject(assertionValue)) {
        assertExisitingColumns(actualValue, assertionValue, `${parentKey + key}.`);
      } else {
        assert.strictEqual(assertionValue, actualValue);
      }
    } catch (e) {
      // throw the most bottom error in recursion.
      if (e instanceof AssertionError) {
        throw e;
      }

      // add more readability.
      let toLog = '';
      if (typeof assertionValue === 'function') {
        toLog = assertionValue.toString();
      } else if (isObject(assertionValue)) {
        toLog = JSON.stringify(assertionValue);
      } else {
        toLog = `${assertionValue}`;
      }

      throw new AssertionError(`"${parentKey + key}" is incompatible. expected: ${toLog}, actual: ${actualValue}`);
    }
  }
}
