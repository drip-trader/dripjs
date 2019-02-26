import { Observable } from 'rxjs';

import { Config, OrderResponse, OrderbookL2Response, QuoteResponse, SettlementResponse, TradeResponse } from '../types';
import { BitmexWsBase } from './bitmex-ws-base';
import { Order, Orderbook, Quote, Settlement, Trade } from './internal';
import { Websocket } from './internal/websocket/websocket';

export class BitmexWS extends BitmexWsBase {
  private readonly ws: Websocket;
  private readonly orderbook: Orderbook;
  private readonly quote: Quote;
  private readonly trade: Trade;
  private readonly order: Order;
  private readonly settlement: Settlement;

  constructor(config?: Config) {
    super(config);

    this.ws = new Websocket(config!);
    this.orderbook = new Orderbook(this.ws);
    this.quote = new Quote(this.ws);
    this.trade = new Trade(this.ws);
    this.order = new Order(this.ws);
    this.settlement = new Settlement(this.ws);
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

  tradeBin1d$(pair: string): Observable<TradeResponse> {
    return this.trade.tradeBin1d$(pair);
  }

  // stop realtime trade
  stopTradeBin1d(pair: string): void {
    this.trade.stopTradeBin1d(pair);
  }

  quote$(pair: string): Observable<QuoteResponse> {
    return this.quote.quote$(pair);
  }

  // stop realtime quote
  stopQuote(pair: string): void {
    this.quote.stopQuote(pair);
  }

  settlement$(pair: string): Observable<SettlementResponse> {
    return this.settlement.settlement$(pair);
  }

  // stop realtime settlement
  stopSettlement(pair: string): void {
    this.settlement.stopSettlement(pair);
  }

  order$(pair: string): Observable<OrderResponse> {
    return this.order.order$(pair);
  }

  stopOrder(pair: string): void {
    this.order.stopOrder(pair);
  }

  destroy(): void {
    this.ws.destroy();
  }
}
