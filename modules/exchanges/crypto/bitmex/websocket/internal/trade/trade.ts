import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BitmexPublicEndPoints, BitmexTradeResponse } from '../../../types';
import { Websocket } from '../websocket/websocket';
import { getTradeChannel, transform } from './helpers';
import { TradeSource } from './types';

export class Trade {
  constructor(private readonly ws: Websocket) {}

  /**
   * latest trade
   *
   * @param pair
   */
  trade$(pair: string): Observable<BitmexTradeResponse> {
    const channel = getTradeChannel(pair);

    return this.ws.subscribe<TradeSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopTrade(pair: string): void {
    const channel = getTradeChannel(pair);
    this.ws.unsubscribe(channel);
  }

  tradeBin1d$(pair: string): Observable<BitmexTradeResponse> {
    const channel = getTradeChannel(pair, BitmexPublicEndPoints.TradeBin1d);

    return this.ws.subscribe<TradeSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopTradeBin1d(pair: string): void {
    const channel = getTradeChannel(pair, BitmexPublicEndPoints.TradeBin1d);
    this.ws.unsubscribe(channel);
  }
}
