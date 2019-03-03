import { difference, isObject, pick } from 'lodash';

/**
 * Override autogenerated timestamp columns with provided values.
 *
 * @param target
 * @param valueToOverride
 */
export function overrideTimestampColumns<T extends any>(target: T, valueToOverride: any = 'overridden'): T {
  if (target === null || target === undefined || typeof target === 'string' || typeof target === 'number' || typeof target === 'boolean') {
    return target;
  }

  if (Array.isArray(target)) {
    target.forEach((v: any) => overrideTimestampColumns(v, valueToOverride));
  } else {
    overrideProperties(target, valueToOverride);
  }

  return target;
}

function overrideProperties(object: { [key: string]: any }, valueToOverride: any): void {
  Object.keys(object).forEach((key) => {
    if (isObject(object[key])) {
      overrideProperties(object[key], valueToOverride);
    } else {
      // all column names that exists in @bronx/core-models.
      switch (key) {
        case 'createdAt':
        case 'updatedAt':
        case 'executedAt':
        case 'canceledAt':
        case 'orderedAt':
        case 'tickAt':
        case 'timestamp':
        case 'lastExecutedAt': {
          object[key] = valueToOverride;

          break;
        }
        default: {
          // noop
        }
      }
    }
  });
}

/**
 * Override autogenerated columns with provided values.
 *
 * @param target
 * @param attrs
 */
export function unpickAutoGenColumns<T extends any>(target: T, attrs?: string[]): T {
  if (!isIterable(target)) {
    return target;
  }

  const attrsToUnpick = attrs ? attrs : ['createdAt', 'updatedAt', 'id'];

  const pickImpl = (ob: any): object => {
    return pick(ob, difference(Object.keys(ob), attrsToUnpick));
  };

  if (Array.isArray(target)) {
    return ((target as any[]).map(pickImpl) as unknown) as T;
  } else {
    return ([target].map(pickImpl)[0] as unknown) as T;
  }
}

function isIterable(obj: any): boolean {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }

  return typeof obj[Symbol.iterator] === 'function';
}
