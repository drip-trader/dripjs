import { Observable } from 'rxjs';
import { BitmexWsBase } from './bitmex-ws-base';
import { IOrderbook, ITrade, IConfig, IOrder } from '../types';
import { Websocket } from './websocket';
import { Orderbook } from './orderbook';
import { Order } from './order';
import { Trade } from './trade';

export class BitmexWS extends BitmexWsBase {
  private readonly ws: Websocket;
  private readonly orderbook: Orderbook;
  private readonly trade: Trade;
  private readonly order: Order;

  constructor(config?: IConfig) {
    super(config);

    this.ws = new Websocket(config!);
    this.orderbook = new Orderbook(this.ws);
    this.trade = new Trade(this.ws);
    this.order = new Order(this.ws);
  }

  // realtime orderbook
  orderbook$(pair: string): Observable<IOrderbook> {
    return this.orderbook.orderbookL2T25$(pair);
  }

  // stop realtime orderbook
  stopOrderbook(pair: string): void {
    this.orderbook.stopOrderbookL2T25(pair);
  }

  trade$(pair: string): Observable<ITrade> {
    return this.trade.trade$(pair);
  }

  // stop realtime trade
  stopTrade(pair: string): void {
    this.trade.stopTrade(pair);
  }

  order$(pair: string): Observable<IOrder|undefined> {
    return this.order.order$(pair);
  }
  
  stopOrder(pair: string): void {
    this.order.stopOrder(pair);
  }
}
