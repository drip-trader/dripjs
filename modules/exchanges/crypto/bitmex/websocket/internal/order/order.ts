import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BitmexOrderResponse } from '../../../types';
import { Websocket } from '../websocket';
import { getOrderChannel } from './helpers';
import { OrderSource } from './types';

export class Order {
  constructor(private readonly ws: Websocket) {}

  /**
   * @param pair
   */
  order$(pair: string): Observable<BitmexOrderResponse> {
    const channel = getOrderChannel(pair);

    return this.ws.subscribe<OrderSource>(channel).pipe(
      filter((wsData) => wsData.data.length > 0),
      map((wsData) => wsData.data[wsData.data.length - 1]),
    );
  }

  stopOrder(pair: string): void {
    const channel = getOrderChannel(pair);
    this.ws.unsubscribe(channel);
  }
}
