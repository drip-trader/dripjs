import { ExchangeCryptoAuthConfig, SupportedExchange } from 'dripjs-types';

import { BitmexSpy, IntelFactory, Spy } from '../../..';

export function findSpy(exchange: string, config: ExchangeCryptoAuthConfig): Spy {
  switch (exchange) {
    case SupportedExchange.Bitmex: {
      return IntelFactory.create(BitmexSpy, { ...config, testnet: false });
    }
    case SupportedExchange.BitmexTestNet: {
      return IntelFactory.create(BitmexSpy, { ...config, testnet: true });
    }
    default: {
      return IntelFactory.create(BitmexSpy, { ...config, testnet: false });
    }
  }
}
