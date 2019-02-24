import { Observable, ReplaySubject } from 'rxjs';

import { BitmexConfig } from '../types';
import { WebsocketData, WebsocketRequest, WebsocketResponse } from './types';
import { WebsocketBase } from './websocket-base';

export class Websocket extends WebsocketBase<WebsocketRequest, WebsocketResponse | WebsocketData> {
  private readonly streamTable = new Map<string, ReplaySubject<WebsocketData>>();

  constructor(config: BitmexConfig) {
    super(config);
  }

  /**
   * handle message
   *
   * @param message
   */
  handleMessage(message: WebsocketResponse | WebsocketData): void {
    const wsData = message as WebsocketData;
    if (wsData.table) {
      const symbol = wsData.data && wsData.data.length ? wsData.data[0].symbol : '';
      const key = `${wsData.table}:${symbol}`;
      const stream = this.streamTable.get(key);
      if (stream) {
        stream.next(wsData);
      }
    }
  }

  // {"op": "subscribe", "args": "orderBookL2_25:XBTUSD"}
  subscribe<T>(args: string): Observable<WebsocketData<T>> {
    let stream = this.streamTable.get(args);

    if (!stream) {
      stream = new ReplaySubject<WebsocketData<T>>(1);
      this.streamTable.set(args, stream);
    }

    this.send({ op: 'subscribe', args });

    return stream.asObservable();
  }

  /**
   * Unsubscribe channel
   *
   * @param arg
   */
  unsubscribe(arg: string): void {
    const stream = this.streamTable.get(arg);
    if (stream) {
      stream.complete();
      this.streamTable.delete(arg);
      this.send({ op: 'unsubscribe', args: arg });
    }

    // TODO handle when unsubscribe complete
  }

  onDestroy(): void {
    // TODO complete all streams
    // clear stream map and key map
    this.streamTable.clear();
  }
}
