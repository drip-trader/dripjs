import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, throttleTime } from 'rxjs/operators';

import { getChannelName } from '../../../../common';
import { OrderbookL2Response, OrderbookResponse } from '../../../../types';
import { BestOrderbook, BestOrderbookPrice, BestTop5OrderbookPrice, WsPublicEndPoints } from '../../../types';
import { transformSourceData } from '../../utils';
import { WebsocketInsider } from '../../websocket-insider';
import { transform, update } from './helpers';

export class Orderbook {
  constructor(private readonly ws: WebsocketInsider) {}

  orderbookL2T25$(pair?: string | string[]): Observable<OrderbookL2Response> {
    const channel = getChannelName({ pair, endPoint: WsPublicEndPoints.OrderBookL2T25 });

    return transformSourceData({
      source$: this.ws.subscribe<OrderbookResponse>(channel),
      transform,
      update,
    }).pipe(filter((book) => book.asks.length > 0 && book.bids.length > 0));
  }

  bestOrderbook$(pair?: string | string[]): Observable<BestOrderbook> {
    return this.orderbookL2T25$(pair).pipe(
      map((o) => ({ ask: o.asks[0], bid: o.bids[0] })),
      distinctUntilChanged((prev, curr) => {
        return JSON.stringify(prev) === JSON.stringify(curr);
      }),
    );
  }

  bestOrderbookPrice$(pair?: string | string[]): Observable<BestOrderbookPrice> {
    return this.orderbookL2T25$(pair).pipe(
      map((o) => ({ ask: o.asks[0][0], bid: o.bids[0][0] })),
      distinctUntilChanged((prev, curr) => {
        return JSON.stringify(prev) === JSON.stringify(curr);
      }),
      throttleTime(10),
    );
  }

  bestTop5OrderbookPrice$(pair?: string | string[]): Observable<BestTop5OrderbookPrice> {
    return this.orderbookL2T25$(pair).pipe(
      map((o) => ({ asks: o.asks.slice(0, 5).map((d) => d[0]), bids: o.bids.slice(0, 5).map((d) => d[0]) })),
      distinctUntilChanged((prev, curr) => {
        return JSON.stringify(prev) === JSON.stringify(curr);
      }),
      throttleTime(10),
    );
  }

  bestTop5BidsOrderbookPrice$(pair?: string | string[]): Observable<string[]> {
    return this.orderbookL2T25$(pair).pipe(
      map((o) => o.bids.slice(0, 5).map((d) => d[0])),
      distinctUntilChanged((prev, curr) => {
        return JSON.stringify(prev) === JSON.stringify(curr);
      }),
      throttleTime(10),
    );
  }

  bestTop5AsksOrderbookPrice$(pair?: string | string[]): Observable<string[]> {
    return this.orderbookL2T25$(pair).pipe(
      map((o) => o.asks.slice(0, 5).map((d) => d[0])),
      distinctUntilChanged((prev, curr) => {
        return JSON.stringify(prev) === JSON.stringify(curr);
      }),
    );
  }

  stopOrderbookL2T25(pair?: string | string[]): void {
    const channel = getChannelName({ pair, endPoint: WsPublicEndPoints.OrderBookL2T25 });
    this.ws.unsubscribe(channel);
  }
}
