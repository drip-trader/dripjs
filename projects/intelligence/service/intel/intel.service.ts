import {
  Bar,
  Config,
  ExchangeCryptoAuthConfig,
  GetBarsInput,
  IntelChannel,
  IntelRealtimeResponse,
  RealtimeInput,
  SupportedExchange,
  Symbol,
} from '@dripjs/types';
import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Spy } from '../../core';
import { findSpy, transform } from '../common';
import { IntelServiceException } from '../exceptions';

// tslint:disable-next-line
const jsonValueReplacer = require('json-value-replacer');

@Injectable()
export class IntelService {
  private readonly intelMap = new Map<string, Spy>();

  async getSymbols(exchange: string): Promise<Symbol[]> {
    const spy = this.getSpyImpl(exchange);
    const symbols = await spy.getSymbols();
    Logger.log(`exchange:${exchange}, symbols data size: ${symbols.length}`, 'getSymbols');

    return symbols;
  }

  async getBars({ exchange, symbol, resolution, start, end }: GetBarsInput): Promise<Bar[]> {
    const spy = this.getSpyImpl(exchange);
    const bars = await spy.getBars({ symbol, resolution, start, end });
    Logger.log(`exchange:${exchange} bar data size: ${bars.length}`, 'getBars');

    return bars;
  }

  data$({ exchange, symbol, channel }: RealtimeInput): Observable<IntelRealtimeResponse> {
    Logger.log(`subscribe to realtime data, exchange:${exchange},symbol:${symbol},channel:${channel}`, 'data$');
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
          Logger.warn(`cannot find channel:${channel}`, 'data$');
        }
      }
    }
    throw new IntelServiceException(`not found spy implemention, for exchange: ${exchange}, symbol: ${symbol}, channel: ${channel}`);
  }

  stopData(exchange: string, symbol?: string, channel?: IntelChannel): void {
    Logger.log(`unsubscribe to realtime data, exchange:${exchange},symbol:${symbol},channel:${channel}`, 'stopData');
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
          this.stopAllData(spy, symbol);
        }
      }
    }
  }

  stopAllData(spy: Spy, symbol?: string): void {
    Logger.log(`unsubscribe to all realtime data, spy:${spy},symbol:${symbol}`, 'stopAllData');
    spy.stopTicker(symbol);
    spy.stopDepth(symbol);
    spy.stopTransaction(symbol);
  }

  close(): void {
    for (const spy of this.intelMap.values()) {
      Logger.log(`destory exchange spy:${spy.name}`, 'close');
      this.stopAllData(spy);
      spy.destory();
    }
  }

  private getSpyImpl(exchange: string): Spy {
    const supportedExchanges = Object.values(SupportedExchange);
    if (!supportedExchanges.includes(exchange)) {
      const msg = `Exchange ${exchange} is not supported, now lists of supported exchanges: ${supportedExchanges}`;
      Logger.error(msg, undefined, 'getSpyImpl');
      throw new IntelServiceException(msg);
    }

    let spyImpl = this.intelMap.get(exchange);
    if (!spyImpl) {
      // tslint:disable-next-line
      const config: ExchangeCryptoAuthConfig = (<Config>require('config')).exchange['crypto'][exchange];
      Logger.log(`loading config: ${JSON.stringify(jsonValueReplacer(config, '******'))}`, 'getSpyImpl');
      spyImpl = findSpy(exchange, config);
      this.intelMap.set(exchange, spyImpl);
    }

    return spyImpl;
  }
}
