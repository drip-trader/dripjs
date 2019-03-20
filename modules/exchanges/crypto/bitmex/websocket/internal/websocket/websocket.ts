import { Observable, ReplaySubject, from, of } from 'rxjs';

import { Config } from '../../../types';
import { WebsocketData, WebsocketRequest, WebsocketResponse } from './types';
import { WebsocketBase } from './websocket-base';

export class Websocket extends WebsocketBase<WebsocketRequest, WebsocketResponse | WebsocketData> {
  private readonly streamTable = new Map<string, ReplaySubject<WebsocketData>>();
  private readonly spltStr = '_';

  constructor(config: Config) {
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
  // OR {"op": "subscribe", "args": ["trade:XBTUSD","trade:BCHH19"]}
  // OR {"op": "subscribe", "args": ["trade"]}
  subscribe<T>(args: string | string[]): Observable<WebsocketData<T>> {
    this.send({ op: 'subscribe', args });
    let streamName = '';
    if (args instanceof Array) {
      for (const arg of args) {
        streamName = `${streamName}${this.spltStr}${arg}`;
      }
    } else {
      streamName = args;
    }

    return this.fetchStream(streamName);
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
      return;
    }

    for (const [name, stream] of this.streamTable.entries()) {
      if (name.includes(arg)) {
        // get multiple names
        const names = name.split(this.spltStr);
        let newName;
        let delName;
        for (const nm of names) {
          // match to the unsubscribe name
          if (nm === arg) {
            delName = nm;
            continue;
          }
          newName = `${newName}${this.spltStr}${nm}`;
        }
        const steam = this.streamTable.get(name);
        // set new name
        this.streamTable.set(newName, steam);
        // delete old name
        this.streamTable.delete(name);
        this.send({ op: 'unsubscribe', args: delName });
      }
    }
  }

  onDestroy(): void {
    // complete all streams
    for (const [name, stream] of this.streamTable.entries()) {
      stream.complete();
      this.send({ op: 'unsubscribe', args: name });
    }
    // clear stream map and key map
    this.streamTable.clear();
  }

  private fetchStream<T>(name: string): ReplaySubject<WebsocketData<T>> {
    let stream = this.streamTable.get(name);
    if (!stream) {
      stream = new ReplaySubject<WebsocketData<T>>(1);
      this.streamTable.set(name, stream);
    }

    return stream;
  }
}
