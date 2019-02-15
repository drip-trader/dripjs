import { Observable, concat } from 'rxjs';
import { IOrderbook, PublicEndPoints } from '../../types';
import { Websocket } from '../websocket';
import { filter, take, scan, map } from 'rxjs/operators';
import { bitmexUpdateOrderbook, adaptBitmexOrderbook, BitmexOrderbookWebsocketData } from './internal';

export class Orderbook {
  private readonly pairOderbookStreamMap = new Map<string, Observable<IOrderbook>>();

  /**
   * @param ws
   */
  constructor(private readonly ws: Websocket) {}

  orderbookL2T25$(pair: string): Observable<IOrderbook> {
    let stream = this.pairOderbookStreamMap.get(pair);
    if (!stream) {
      stream = this.startOrderbookL2T25$(pair);
      this.pairOderbookStreamMap.set(pair, stream);
    }

    return stream;
  }

  stopOrderbookL2T25(pair: string): void {
    const channel = getOrderbookChannel(pair, PublicEndPoints.OrderBookL2T25);
    this.ws.unsubscribe(channel);
    this.pairOderbookStreamMap.delete(pair);
  }

  private startOrderbookL2T25$(pair: string): Observable<IOrderbook> {
    const channel = getOrderbookChannel(pair, PublicEndPoints.OrderBookL2T25);

    const data$ = this.ws.subscribe<BitmexOrderbookWebsocketData>(channel);

    /*
     * Make sure 'partial' come first and then 'insert' 'update' 'delete'
     */
    const snapshot$ = data$.pipe(filter((orderbookData) => orderbookData.action === 'partial'), take(1));

    const update$ = data$.pipe(
      filter(
        (orderbookData) => orderbookData.action === 'update' || orderbookData.action === 'insert' || orderbookData.action === 'delete',
      ),
    );

    return concat(snapshot$, update$).pipe(scan(bitmexUpdateOrderbook), map(adaptBitmexOrderbook));
  }
}

function getOrderbookChannel(
  pair: string,
  endpoint: PublicEndPoints.OrderBook10 | PublicEndPoints.OrderBookL2 | PublicEndPoints.OrderBookL2T25,
): string {

  return `${endpoint}:${pair}`;
}
