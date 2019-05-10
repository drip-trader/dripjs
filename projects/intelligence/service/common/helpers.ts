import { ExchangeCryptoAuthConfig, RealtimeType, SupportedExchange } from '@dripjs/types';

import { BitmexSpy, IntelFactory, Spy } from '../../core';
import { IntelServiceException } from '../exceptions';
import { IntelChannel, IntelRealtimeResponse } from '../types';

export function findSpy(exchange: string, config: ExchangeCryptoAuthConfig): Spy {
  switch (exchange) {
    case SupportedExchange.Bitmex: {
      return IntelFactory.create(BitmexSpy, { ...config, testnet: false });
    }
    case SupportedExchange.BitmexTestNet: {
      return IntelFactory.create(BitmexSpy, { ...config, testnet: true });
    }
    default: {
    }
  }
  throw new IntelServiceException(`not found spy implemention, for exchange: ${exchange}`);
}

export function transform(channel: IntelChannel, data: RealtimeType): IntelRealtimeResponse {
  return { channel, data };
}
