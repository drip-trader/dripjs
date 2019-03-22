import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { OrderResponse, PrivateEndPoints } from '../../../types';
import { getTradeChannel } from '../../helpers';
import { Websocket } from '../websocket';
import { getOrderChannel } from './helpers';
import { OrderSource } from './types';

export class Order {
  constructor(private readonly ws: Websocket) {}

  /**
   * @param pair
   */
  order$(pair?: string | string[]): Observable<OrderResponse> {
    const channel = getTradeChannel({pair, endPoint: PrivateEndPoints.Order});

    return this.ws.subscribe<OrderSource>(channel).pipe(
      filter((wsData) => wsData.data.length > 0),
      map((wsData) => wsData.data[wsData.data.length - 1]),
    );
  }

  stopOrder(pair?: string | string[]): void {
    const channel = getTradeChannel({pair, endPoint: PrivateEndPoints.Order});
    this.ws.unsubscribe(channel);
  }
}
