import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PublicEndPoints, TradeResponse } from '../../../types';
import { getTradeChannel } from '../../helpers';
import { Websocket } from '../websocket';
import { transform } from './helpers';
import { TradeSource } from './types';

export class Trade {
  constructor(private readonly ws: Websocket) {}

  /**
   * latest trade
   *
   * @param pair
   */
  trade$(pair?: string | string[]): Observable<TradeResponse> {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.Trade});

    return this.ws.subscribe<TradeSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopTrade(pair?: string | string[]): void {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.Trade});
    this.ws.unsubscribe(channel);
  }

  tradeBin1d$(pair?: string | string[]): Observable<TradeResponse> {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.TradeBin1d});

    return this.ws.subscribe<TradeSource>(channel).pipe(
      map(
        /* istanbul ignore next */
        (wsData) => transform(wsData.data[0]),
      ),
    );
  }

  stopTradeBin1d(pair?: string | string[]): void {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.TradeBin1d});
    this.ws.unsubscribe(channel);
  }
}
