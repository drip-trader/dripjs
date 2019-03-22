import { Observable, concat } from 'rxjs';
import { filter, map, scan, take } from 'rxjs/operators';

import { OrderbookL2Response, OrderbookResponse, PublicEndPoints } from '../../../types';
import { getTradeChannel } from '../../helpers';
import { Websocket, WebsocketData } from '../websocket';
import { getChannel, transform, update } from './helpers';

export class Orderbook {
  private readonly streamMap = new Map<string, Observable<OrderbookL2Response>>();

  constructor(private readonly ws: Websocket) {}

  orderbookL2T25$(pair?: string | string[]): Observable<OrderbookL2Response> {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.OrderBookL2T25});

    return this.ws.subscribe<WebsocketData<OrderbookResponse>>(channel).pipe(map((wsData) => transform(wsData.data[0])));
  }

  stopOrderbookL2T25(pair?: string | string[]): void {
    const channel = getTradeChannel({pair, endPoint: PublicEndPoints.OrderBookL2T25});
    this.ws.unsubscribe(channel);
  }
}
