import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IOrder, PrivateEndPoints } from '../../types';
import { Websocket } from '../websocket';
import { BitmexOrderWebsocketData, adaptBitmexOrder } from './internal';

export class Order {
  /**
   *
   * @param ws
   */
  constructor(private readonly ws: Websocket) {}

  /**
   * @param pair
   */
  order$(pair: string): Observable<IOrder | undefined> {
    const channel = getOrderChannel(pair);

    return this.ws.subscribe<BitmexOrderWebsocketData>(channel).pipe(map((wsData) => adaptBitmexOrder(wsData.data)));
  }

  stopOrder(pair: string): void {
    const channel = getOrderChannel(pair);
    this.ws.unsubscribe(channel);
  }
}

function getOrderChannel(pair: string): string {
  return `${PrivateEndPoints.Order}:${pair}`;
}
