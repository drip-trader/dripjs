import { BitmexOrderSide, BitmexRest, BitmexWS, Config } from '@dripjs/exchanges';
import { Bar, BarRequest, Depth, OrderSide, Symbol, Ticker, Transaction } from '@dripjs/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Intelligence } from '../intelligence';

export class Bitmex extends Intelligence {
  rest: BitmexRest;
  ws: BitmexWS;

  constructor(config: Config) {
    super();
    this.rest = new BitmexRest(config);
    this.ws = new BitmexWS(config);
  }

  destory(): void {
    this.ws.destroy();
  }

  async getSymbolInfo(symbol: string): Promise<Symbol> {
    return <any>{};
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
