import { Observable } from 'rxjs';
import { IConfig, IOrderbook, ITrade, IOrder } from '../types';

export abstract class BitmexWsBase {
  protected config: IConfig;

  constructor(config?: IConfig) {
    this.config = {
      apiKey: '',
      apiSecret: '',
      testnet: false,
      ...config
    };
  }

  /**
   * get realtime orderbook
   * 
   * @param pair pair name
   */
  abstract orderbook$(pair: string): Observable<IOrderbook>;
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
  abstract trade$(pair: string): Observable<ITrade>;
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
  abstract order$(pair: string): Observable<IOrder|undefined>;
  /**
   * stop realtime Order
   * 
   * @param pair 
   */
  abstract stopOrder(pair: string): void;
}
