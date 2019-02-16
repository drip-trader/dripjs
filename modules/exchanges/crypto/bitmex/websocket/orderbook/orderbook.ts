import { Observable, concat } from 'rxjs';
import { filter, map, scan, take } from 'rxjs/operators';

import { OrderbookL2T25Response, PublicEndPoints } from '../../types';
import { Websocket } from '../websocket';
import { getChannel, transform, update } from './helpers';
import { OrderbookSource } from './types';

export class Orderbook {
  private readonly streamMap = new Map<string, Observable<OrderbookL2T25Response>>();

  constructor(private readonly ws: Websocket) {}

  orderbookL2T25$(pair: string): Observable<OrderbookL2T25Response> {
    let stream = this.streamMap.get(pair);
    if (!stream) {
      stream = this.startOrderbookL2T25$(pair);
      this.streamMap.set(pair, stream);
    }

    return stream;
  }

  stopOrderbookL2T25(pair: string): void {
    const channel = getChannel(pair, PublicEndPoints.OrderBookL2T25);
    this.ws.unsubscribe(channel);
    this.streamMap.delete(pair);
  }

  private startOrderbookL2T25$(pair: string): Observable<OrderbookL2T25Response> {
    const channel = getChannel(pair, PublicEndPoints.OrderBookL2T25);

    const data$ = this.ws.subscribe<OrderbookSource>(channel);

    /*
     * Make sure 'partial' come first and then 'insert' 'update' 'delete'
     */
    const snapshot$ = data$.pipe(
      filter((orderbookData) => orderbookData.action === 'partial'),
      take(1),
    );

    const update$ = data$.pipe(
      filter(
        (orderbookData) => orderbookData.action === 'update' || orderbookData.action === 'insert' || orderbookData.action === 'delete',
      ),
    );

    return concat(snapshot$, update$).pipe(
      scan(update),
      map(transform),
    );
  }
}
