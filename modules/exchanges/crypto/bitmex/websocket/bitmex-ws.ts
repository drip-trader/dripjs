import { Observable } from 'rxjs';

import { Config, OrderResponse, OrderbookL2Response, QuoteResponse, TradeResponse } from '../types';
import { BitmexWsBase } from './bitmex-ws-base';
import { Order } from './order';
import { Orderbook } from './orderbook';
import { Quote } from './quote';
import { Trade } from './trade';
import { Websocket } from './websocket';

export class BitmexWS extends BitmexWsBase {
  private readonly ws: Websocket;
  private readonly orderbook: Orderbook;
  private readonly quote: Quote;
  private readonly trade: Trade;
  private readonly order: Order;

  constructor(config?: Config) {
    super(config);

    this.ws = new Websocket(config!);
    this.orderbook = new Orderbook(this.ws);
    this.quote = new Quote(this.ws);
    this.trade = new Trade(this.ws);
    this.order = new Order(this.ws);
  }

  // realtime orderbook
  orderbook$(pair: string): Observable<OrderbookL2Response> {
    return this.orderbook.orderbookL2T25$(pair);
  }

  // stop realtime orderbook
  stopOrderbook(pair: string): void {
    this.orderbook.stopOrderbookL2T25(pair);
  }

  trade$(pair: string): Observable<TradeResponse> {
    return this.trade.trade$(pair);
  }

  // stop realtime trade
  stopTrade(pair: string): void {
    this.trade.stopTrade(pair);
  }

  quote$(pair: string): Observable<QuoteResponse> {
    return this.quote.quote$(pair);
  }

  // stop realtime quote
  stopQuote(pair: string): void {
    this.quote.stopQuote(pair);
  }

  order$(pair: string): Observable<OrderResponse | undefined> {
    return this.order.order$(pair);
  }

  stopOrder(pair: string): void {
    this.order.stopOrder(pair);
  }

  destroy(): void {
    this.ws.destroy();
  }
}
