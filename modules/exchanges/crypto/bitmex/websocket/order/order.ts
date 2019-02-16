import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OrderResponse, PrivateEndPoints } from '../../types';
import { Websocket } from '../websocket';
import { getOrderChannel, transform } from './helpers';
import { OrderSource } from './types';

export class Order {
  /**
   *
   * @param ws
   */
  constructor(private readonly ws: Websocket) {}

  /**
   * @param pair
   */
  order$(pair: string): Observable<OrderResponse | undefined> {
    const channel = getOrderChannel(pair);

    return this.ws.subscribe<OrderSource>(channel).pipe(map((wsData) => transform(wsData.data)));
  }

  stopOrder(pair: string): void {
    const channel = getOrderChannel(pair);
    this.ws.unsubscribe(channel);
  }
}
