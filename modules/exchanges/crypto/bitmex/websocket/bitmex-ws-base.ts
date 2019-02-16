import { Observable } from 'rxjs';

import { Config, OrderResponse, OrderbookL2Response, TradeResponse } from '../types';

export abstract class BitmexWsBase {
  protected config: Config;

  constructor(config?: Config) {
    this.config = {
      apiKey: '',
      apiSecret: '',
      testnet: false,
      ...config,
    };
  }

  /**
   * get realtime orderbook
   *
   * @param pair pair name
   */
  abstract orderbook$(pair: string): Observable<OrderbookL2Response>;
  /**
   * stop realtime orderbook
   *
   * @param pair
   */
  abstract stopOrderbook(pair: string): void;
  /**
   * get realtime trades
   *
   * @param pair pair name
   */
  abstract trade$(pair: string): Observable<TradeResponse>;
  /**
   * stop realtime trades
   *
   * @param pair
   */
  abstract stopTrade(pair: string): void;
  /**
   * get realtime Order
   *
   * @param pair
   */
  abstract order$(pair: string): Observable<OrderResponse | undefined>;
  /**
   * stop realtime Order
   *
   * @param pair
   */
  abstract stopOrder(pair: string): void;
}
