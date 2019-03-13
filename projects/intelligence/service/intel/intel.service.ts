import { Injectable } from '@nestjs/common';
import { Config, ExchangeCryptoAuthConfig, SupportedExchange, Symbol } from 'dripjs-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Spy } from '../../core';
import { IntelChannel, IntelRealtimeResponse, findSpy, transform } from '../common';
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

  data$(exchange: string, symbol: string, channel: IntelChannel): Observable<IntelRealtimeResponse> {
    const spy = this.getSpyImpl(exchange);
    if (spy) {
      switch (channel) {
        case IntelChannel.Ticker: {
          return spy.getTicker$(symbol).pipe(map((ticker) => transform(channel, ticker)));
        }
        case IntelChannel.Depth: {
          return spy.getDepth$(symbol).pipe(map((depth) => transform(channel, depth)));
        }
        case IntelChannel.Transaction: {
          return spy.getTransaction$(symbol).pipe(map((transation) => transform(channel, transation)));
        }
        default: {
        }
      }
    }
    throw new IntelServiceException(`not found spy implemention, for exchange: ${exchange}, symbol: ${symbol}, channel: ${channel}`);
  }

  stopData(exchange: string, symbol: string, channel?: IntelChannel): void {
    const spy = this.getSpyImpl(exchange);
    if (spy) {
      switch (channel) {
        case IntelChannel.Ticker: {
          spy.stopTicker(symbol);
          break;
        }
        case IntelChannel.Depth: {
          spy.stopDepth(symbol);
          break;
        }
        case IntelChannel.Transaction: {
          spy.stopTransaction(symbol);
          break;
        }
        default: {
          spy.stopTicker(symbol);
          spy.stopDepth(symbol);
          spy.stopTransaction(symbol);
        }
      }
    }
  }

  close(): void {
    for (const spy of this.intelMap.values()) {
      spy.destory();
    }
  }

  private getSpyImpl(exchange: string): Spy | undefined {
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
