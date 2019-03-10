import { ExchangeCryptoAuthConfig } from 'dripjs-types';

import { BitmexSpy, IntelFactory, Spy } from '../../../..';
import { IntelErrorResponse, SpyImpl } from './types';

export function findSpy(exchange: string, config: ExchangeCryptoAuthConfig): Spy | undefined {
  switch (exchange) {
    case 'bitmex': {
      return IntelFactory.create(BitmexSpy, { ...config, testnet: false });
    }
    default: {
    }
  }
}

export function makeIntelError(name: string, message: string): SpyImpl {
  const error: IntelErrorResponse = { name, message };

  return { error };
}
