import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getChannelName } from '../../../../common';
import { TradeResponse } from '../../../../types';
import { WsPublicEndPoints } from '../../../types';
import { WebsocketInsider } from '../../websocket-insider';
import { transform } from './helpers';
import { TradeSource } from './types';

export class Trade {
  constructor(private readonly ws: WebsocketInsider) {}

  /**
   * latest trade
   *
   * @param pair
   */
  trade$(pair?: string | string[]): Observable<TradeResponse> {
    const channel = getChannelName({ pair, endPoint: WsPublicEndPoints.Trade });

    return this.ws.subscribe<TradeSource>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopTrade(pair?: string | string[]): void {
    const channel = getChannelName({ pair, endPoint: WsPublicEndPoints.Trade });
    this.ws.unsubscribe(channel);
  }

  tradeBin1d$(pair?: string | string[]): Observable<TradeResponse> {
    const channel = getChannelName({ pair, endPoint: WsPublicEndPoints.TradeBin1d });

    return this.ws.subscribe<TradeSource>(channel).pipe(
      map(
        /* istanbul ignore next */
        (wsData) => transform(wsData.data[0]),
      ),
    );
  }

  stopTradeBin1d(pair?: string | string[]): void {
    const channel = getChannelName({ pair, endPoint: WsPublicEndPoints.TradeBin1d });
    this.ws.unsubscribe(channel);
  }
}
