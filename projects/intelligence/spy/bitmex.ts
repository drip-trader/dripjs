import { BitmexOrderSide, BitmexRest, BitmexWS, Config } from '@dripjs/exchanges';
import { Bar, BarRequest, Depth, OrderSide, Symbol, Ticker, Transaction } from '@dripjs/types';
import { BigNumber } from 'bignumber.js';
import { Pair } from 'dripjs-types';
import { Observable } from 'rxjs';
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
    return <any>{};
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

  stopDepths(symbol: string): void {
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
