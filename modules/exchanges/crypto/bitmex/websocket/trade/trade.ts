import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PublicEndPoints } from '../../types';
import { TradeResponse } from '../../types/response';
import { Websocket } from '../websocket';
import { getTradeChannel, transform } from './helpers';
import { TradeSource } from './types';

export class Trade {
  constructor(private readonly ws: Websocket) {}

  /**
   * latest trade
   *
   * @param pair
   */
  trade$(pair: string): Observable<TradeResponse> {
    const channel = getTradeChannel(pair);

    return this.ws.subscribe<TradeSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopTrade(pair: string): void {
    const channel = getTradeChannel(pair);
    this.ws.unsubscribe(channel);
  }

  tradeBucketed$(pair: string): Observable<TradeResponse> {
    const channel = getTradeChannel(pair, PublicEndPoints.TradeBucketed);

    return this.ws.subscribe<TradeSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopTradeBucketed(pair: string): void {
    const channel = getTradeChannel(pair, PublicEndPoints.TradeBucketed);
    this.ws.unsubscribe(channel);
  }
}
