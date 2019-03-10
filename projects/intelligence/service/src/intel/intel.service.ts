import { Injectable } from '@nestjs/common';
import { Config, ExchangeCryptoAuthConfig, SupportedExchange, Symbol } from 'dripjs-types';

import { Spy } from '../../..';
import { IntelGetSymbolsResponse, SpyImpl, findSpy, makeIntelError } from './common';

@Injectable()
export class IntelService {
  private readonly intelMap = new Map<string, Spy>();

  async getSymbols(exchange: string): Promise<IntelGetSymbolsResponse> {
    let symbols: Symbol[] = [];
    const { spy, error } = this.getSpyImpl(exchange);
    if (error) {
      return { symbols, error };
    }
    if (spy) {
      symbols = await spy.getSymbols();
    }

    return { symbols };
  }

  private getSpyImpl(exchange: string): SpyImpl {
    const supportedExchanges = Object.values(SupportedExchange);
    if (!supportedExchanges.includes(exchange)) {
      return makeIntelError(
        'exchange_not_supported',
        `Exchange ${exchange} is not supported, now lists of supported exchanges: ${Object.values(supportedExchanges)}`,
      );
    }

    // tslint:disable-next-line
    const config: ExchangeCryptoAuthConfig | undefined = (<Config>require('config')).exchange['crypto'][exchange];
    if (!config) {
      return makeIntelError('exchange_not_configuredd', `Please check the config file, exchange.crypto.${exchange} is not configured`);
    }

    let spyImpl = this.intelMap.get(exchange);
    if (!spyImpl) {
      spyImpl = findSpy(exchange, config);
      if (spyImpl) {
        this.intelMap.set(exchange, spyImpl);
      } else {
        return makeIntelError('exchange_not_implementation_class', `The implementation class of ${exchange} was not found`);
      }
    }

    return { spy: spyImpl };
  }
}
