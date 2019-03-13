import { Bitmex } from 'dripjs-exchanges';
import { Bar, BarRequest, Depth, OrderSide, Pair, Ticker, Transaction } from 'dripjs-types';
import { BigNumber } from 'bignumber.js';
import * as moment from 'moment';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { Intel } from '../intel';

export interface BitmexBarRequest extends BarRequest {
  resolution: Bitmex.Resolution;
}

export class BitmexSpy extends Intel {
  readonly name = 'bitmex';
  private readonly rest: Bitmex.BitmexRest;
  private readonly ws: Bitmex.BitmexWS;
  private symbols: Pair[] = [];

  constructor(config: Bitmex.Config) {
    super();
    this.rest = new Bitmex.BitmexRest(config);
    this.ws = new Bitmex.BitmexWS(config);
  }

  destory(): void {
    this.ws.destroy();
  }

  async getSymbols(): Promise<Pair[]> {
    if (this.symbols.length === 0) {
      const res = await this.rest.fetchInstrument();
      if (!res.error) {
        this.symbols = res.instruments.map((o) => {
          return {
            exchange: 'bitmex',
            name: o.symbol,
            baseAsset: o.rootSymbol,
            quoteAsset: o.quoteCurrency,
            amountPrecision: o.lotSize,
            pricePrecision: new BigNumber(o.tickSize).dp(),
            minOrderAmount: 0,
            maxOrderAmount: 0,
            minOrderPrice: 0,
            maxOrderPrice: 0,
            isEnabled: true,
          };
        });
      }
      // TODO BitmexError handle
    }

    return this.symbols;
  }

  async getSymbol(symbol: string): Promise<Pair | undefined> {
    if (this.symbols.length === 0) {
      await this.getSymbols();
    }

    return this.symbols.find((o) => o.name === symbol);
  }

  getTicker$(symbol: string): Observable<Ticker> {
    const trade$ = this.ws.trade$(symbol);
    const quote$ = this.ws.quote$(symbol);

    return zip(trade$, quote$).pipe(
      map((res) => {
        return {
          ask: res[1].askPrice,
          bid: res[1].bidPrice,
          high: 0,
          low: 0,
          last: res[0].price,
          volume: res[0].amount,
          time: res[0].timestamp,
        };
      }),
    );
  }

  stopTicker(symbol: string): void {
    this.ws.stopTrade(symbol);
    this.ws.stopQuote(symbol);
  }

  async getBars(request: BitmexBarRequest): Promise<Bar[]> {
    const res = await this.rest.fetchBar({
      symbol: request.symbol,
      binSize: request.resolution,
      startTime: moment(request.start).toISOString(),
      endTime: moment(request.end).toISOString(),
    });
    let bars: Bar[] = [];
    if (res.bars.length > 0) {
      bars = res.bars.map((o) => {
        return {
          time: moment(o.timestamp).unix() * 1000,
          open: o.open,
          high: o.high,
          low: o.low,
          close: o.close,
          volume: o.volume,
        };
      });
    }

    return bars;
  }

  getDepth$(symbol: string): Observable<Depth> {
    return this.ws.orderbook$(symbol).pipe(
      map((res) => {
        return <Depth>{
          asks: res.asks.map((o) => o.map(Number)),
          bids: res.bids.map((o) => o.map(Number)),
        };
      }),
    );
  }

  stopDepth(symbol: string): void {
    this.ws.stopOrderbook(symbol);
  }

  getTransaction$(symbol: string): Observable<Transaction> {
    return this.ws.trade$(symbol).pipe(
      map((res) => {
        return {
          time: res.timestamp,
          side: res.side === Bitmex.OrderSide.Buy ? OrderSide.Buy : OrderSide.Sell,
          price: res.price,
          amount: res.amount,
        };
      }),
    );
  }

  stopTransaction(symbol: string): void {
    this.ws.stopTrade(symbol);
  }
}
