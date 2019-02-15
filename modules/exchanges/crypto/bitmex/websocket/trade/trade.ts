import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITrade, PublicEndPoints } from '../../types';
import { Websocket } from '../websocket';
import { BitmexTradeWebsocketData, adaptBitmexTrade } from './internal';

export class Trade {
  /**
   *
   * @param ws
   */
  constructor(private readonly ws: Websocket) {}

  // fetch trades
  fetchTrades$(pair: string, start?: number, end?: number, limit?: number, sort?: number): Observable<Trade[]> {
    return EMPTY;
  }

  /**
   * latest trade
   *
   * @param pair
   */
  trade$(pair: string): Observable<ITrade> {
    const channel = getTradeChannel(pair);

    return this.ws.subscribe<BitmexTradeWebsocketData>(channel).pipe(map((wsData) => adaptBitmexTrade(wsData.data[0])));
  }

  stopTrade(pair: string): void {
    const channel = getTradeChannel(pair);
    this.ws.unsubscribe(channel);
  }
}

function getTradeChannel(pair: string): string {
  return `${PublicEndPoints.Trade}:${pair}`;
}
