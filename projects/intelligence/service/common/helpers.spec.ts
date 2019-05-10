import { testnetConfig } from '@dripjs/testing';
import { SupportedExchange } from '@dripjs/types';

import { IntelServiceException } from '../exceptions';
import { findSpy } from './helpers';

describe('intel-service.helpers', () => {
  it('findSpy', () => {
    const spy = findSpy(SupportedExchange.BitmexTestNet, testnetConfig);
    expect(spy).toBeDefined();
  });

  it('findSpy to error', () => {
    const exchange = 'zzz';
    expect(() => findSpy(exchange, testnetConfig)).toThrowError(
      new IntelServiceException(`not found spy implemention, for exchange: ${exchange}`),
    );
  });
});
