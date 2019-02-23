import { BitmexOrderSide, BitmexRest, BitmexWS, Config } from '@dripjs/exchanges';
import { Bar, BarRequest, Depth, OrderSide, Ticker, Transaction } from '@dripjs/types';
import { BigNumber } from 'bignumber.js';
import { Pair } from 'dripjs-types';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { Intelligence } from '../intelligence';

export class Bitmex extends Intelligence {
  rest: BitmexRest;
  ws: BitmexWS;

  private symbols: Pair[] = [];

  constructor(config: Config) {
    super();
    this.rest = new BitmexRest(config);
    this.ws = new BitmexWS(config);
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
            name: o.symbol,
            baseAsset: o.rootSymbol,
            quoteAsset: o.quoteCurrency,
            amountPrecision: o.lotSize,
            pricePrecision: new BigNumber(o.tickSize).dp(),
          };
        });
      }
      // TODO Error handle
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

  async getBars(request: BarRequest): Promise<Bar[]> {
    return <any>{};
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

  getTransactions$(symbol: string): Observable<Transaction> {
    return this.ws.trade$(symbol).pipe(
      map((res) => {
        return <Transaction>{
          time: res.timestamp,
          side: res.side === BitmexOrderSide.Buy ? OrderSide.Buy : OrderSide.Sell,
          price: res.price,
          amount: res.amount,
        };
      }),
    );
  }

  stopTransactions(symbol: string): void {
    this.ws.stopTrade(symbol);
  }
}
