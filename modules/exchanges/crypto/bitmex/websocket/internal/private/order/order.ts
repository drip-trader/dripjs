import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { getChannelName } from '../../../../common';
import { OrderResponse } from '../../../../types';
import { WsPrivateEndPoints } from '../../../types';
import { WebsocketInsider } from '../../websocket-insider';
import { OrderSource } from './types';

export class Order {
  constructor(private readonly ws: WebsocketInsider) {}

  /**
   * @param pair
   */
  order$(pair?: string | string[]): Observable<OrderResponse[]> {
    const channel = getChannelName({ pair, endPoint: WsPrivateEndPoints.Order });

    return this.ws.subscribe<OrderSource>(channel).pipe(
      filter((wsData) => wsData.data.length > 0),
      map((wsData) => wsData.data),
    );
  }

  stopOrder(pair?: string | string[]): void {
    const channel = getChannelName({ pair, endPoint: WsPrivateEndPoints.Order });
    this.ws.unsubscribe(channel);
  }
}
