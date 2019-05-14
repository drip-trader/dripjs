import { Observable } from 'rxjs';

import { getChannelName } from '../../../../common';
import { OrderbookL2Response, OrderbookResponse } from '../../../../types';
import { PublicEndPoints } from '../../../types';
import { transformSourceData } from '../../utils';
import { WebsocketInsider } from '../../websocket-insider';
import { transform, update } from './helpers';

export class Orderbook {
  constructor(private readonly ws: WebsocketInsider) {}

  orderbookL2T25$(pair?: string | string[]): Observable<OrderbookL2Response> {
    const channel = getChannelName({ pair, endPoint: PublicEndPoints.OrderBookL2T25 });

    return transformSourceData({
      source$: this.ws.subscribe<OrderbookResponse>(channel),
      transform,
      update,
    });
  }

  stopOrderbookL2T25(pair?: string | string[]): void {
    const channel = getChannelName({ pair, endPoint: PublicEndPoints.OrderBookL2T25 });
    this.ws.unsubscribe(channel);
  }
}
