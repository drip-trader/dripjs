import { Observable } from 'rxjs';

import { Config, OrderResponse, OrderbookL2Response, PositionResponse, QuoteResponse, SettlementResponse, TradeResponse } from '../types';
import { Order, Orderbook, Position, Quote, Settlement, Trade, WebsocketInsider } from './internal';

export class WebsocketBase {
  private readonly ws: WebsocketInsider;
  private readonly position: Position;
  private readonly orderbook: Orderbook;
  private readonly quote: Quote;
  private readonly trade: Trade;
  private readonly order: Order;
  private readonly settlement: Settlement;

  constructor(protected config?: Config) {
    if (this.config) {
      if (!this.config.apiKey || this.config.apiKey === 'undefined') {
        this.config.apiKey = '';
      }
      if (!this.config.apiSecret || this.config.apiSecret === 'undefined') {
        this.config.apiSecret = '';
      }
    }
    this.config = {
      apiKey: '',
      apiSecret: '',
      testnet: false,
      ...config,
    };
    this.ws = new WebsocketInsider(this.config);
    this.orderbook = new Orderbook(this.ws);
    this.quote = new Quote(this.ws);
    this.trade = new Trade(this.ws);
    this.settlement = new Settlement(this.ws);
    this.order = new Order(this.ws);
    this.position = new Position(this.ws);
  }

  // realtime orderbook
  orderbook$(pair?: string | string[]): Observable<OrderbookL2Response> {
    return this.orderbook.orderbookL2T25$(pair);
  }

  // stop realtime orderbook
  stopOrderbook(pair?: string | string[]): void {
    this.orderbook.stopOrderbookL2T25(pair);
  }

  trade$(pair?: string | string[]): Observable<TradeResponse> {
    return this.trade.trade$(pair);
  }

  // stop realtime trade
  stopTrade(pair?: string | string[]): void {
    this.trade.stopTrade(pair);
  }

  tradeBin1d$(pair?: string | string[]): Observable<TradeResponse> {
    return this.trade.tradeBin1d$(pair);
  }

  // stop realtime trade
  stopTradeBin1d(pair?: string | string[]): void {
    this.trade.stopTradeBin1d(pair);
  }

  quote$(pair?: string | string[]): Observable<QuoteResponse> {
    return this.quote.quote$(pair);
  }

  // stop realtime quote
  stopQuote(pair?: string | string[]): void {
    this.quote.stopQuote(pair);
  }

  settlement$(pair?: string | string[]): Observable<SettlementResponse> {
    return this.settlement.settlement$(pair);
  }

  // stop realtime settlement
  stopSettlement(pair?: string | string[]): void {
    this.settlement.stopSettlement(pair);
  }

  order$(pair?: string | string[]): Observable<OrderResponse> {
    return this.order.order$(pair);
  }

  stopOrder(pair?: string | string[]): void {
    this.order.stopOrder(pair);
  }

  position$(pair?: string | string[]): Observable<PositionResponse[]> {
    return this.position.position$(pair);
  }

  stopPosition(pair?: string | string[]): void {
    this.position.stopPosition(pair);
  }

  destroy(): void {
    this.ws.destroy();
  }
}
