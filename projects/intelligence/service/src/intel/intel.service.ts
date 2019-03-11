import { Injectable } from '@nestjs/common';
import { Config, ExchangeCryptoAuthConfig, SupportedExchange, Symbol } from 'dripjs-types';

import { Spy } from '../../..';
import { findSpy } from '../common';
import { IntelServiceException } from '../exceptions';

@Injectable()
export class IntelService {
  private readonly intelMap = new Map<string, Spy>();

  async getSymbols(exchange: string): Promise<Symbol[]> {
    let symbols: Symbol[] = [];
    const spy = this.getSpyImpl(exchange);
    if (spy) {
      symbols = await spy.getSymbols();
    }

    return symbols;
  }

  private getSpyImpl(exchange: string): Spy {
    const supportedExchanges = Object.values(SupportedExchange);
    if (!supportedExchanges.includes(exchange)) {
      throw new IntelServiceException(`Exchange ${exchange} is not supported, now lists of supported exchanges: ${supportedExchanges}`);
    }

    // tslint:disable-next-line
    const config: ExchangeCryptoAuthConfig = (<Config>require('config')).exchange['crypto'][exchange];

    let spyImpl = this.intelMap.get(exchange);
    if (!spyImpl) {
      spyImpl = findSpy(exchange, config);
      this.intelMap.set(exchange, spyImpl);
    }

    return spyImpl;
  }
}
