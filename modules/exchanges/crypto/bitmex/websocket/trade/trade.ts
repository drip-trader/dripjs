import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
