import { Observable } from 'rxjs';

import { BitmexConfig, BitmexOrderResponse, BitmexOrderbookL2Response, BitmexTradeResponse } from '../types';

export abstract class BitmexWsBase {
  constructor(protected config?: BitmexConfig) {
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
  }

  /**
   * get realtime orderbook
   *
   * @param pair pair name
   */
  abstract orderbook$(pair: string): Observable<BitmexOrderbookL2Response>;
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
  abstract trade$(pair: string): Observable<BitmexTradeResponse>;
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
  abstract order$(pair: string): Observable<BitmexOrderResponse | undefined>;
  /**
   * stop realtime Order
   *
   * @param pair
   */
  abstract stopOrder(pair: string): void;
}
