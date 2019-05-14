import { Observable, ReplaySubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Config } from '../../../types';
import { PrivateEndPoints, PublicEndPoints } from '../../types';
import { WebsocketData, WebsocketRequest, WebsocketResponse } from './types';
import { WebsocketInsiderBase } from './websocket-insider-base';

interface StreamData {
  uuid: string;
  name: string;
  stream: ReplaySubject<WebsocketData>;
}

export class WebsocketInsider extends WebsocketInsiderBase<WebsocketRequest, WebsocketResponse | WebsocketData> {
  private streamTable: StreamData[] = [];

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

      const streamData = this.streamTable.find((o) => o.name === key);
      // find all channel, eg:trade
      const allStreamData = this.streamTable.find((o) => o.name === wsData.table);
      if (streamData) {
        streamData.stream.next(wsData);
      } else if (allStreamData) {
        allStreamData.stream.next(wsData);
      }
    }
  }

  // {"op": "subscribe", "args": "orderBookL2_25:XBTUSD"}
  // OR {"op": "subscribe", "args": ["trade:XBTUSD","trade:BCHH19"]}
  // OR {"op": "subscribe", "args": ["trade"]}
  subscribe<T>(channel: string | string[]): Observable<WebsocketData<T>> {
    this.send({ op: 'subscribe', args: channel });

    return this.fetchOrNewStream(channel);
  }

  /**
   * Unsubscribe channel
   *
   * @param channel
   */
  unsubscribe(channel: string | string[]): void {
    // unsubscribe real-time data from exchange
    this.send({ op: 'unsubscribe', args: channel });
    // when multiple channel
    if (channel instanceof Array) {
      for (const cn of channel) {
        this.delStream(cn);
      }
    } else {
      this.delStream(channel);
    }
  }

  onDestroy(): void {
    // remove duplicates
    const uniqueStreamData: StreamData[] = [];
    for (const steamData of this.streamTable) {
      if (uniqueStreamData.length === 0) {
        uniqueStreamData.push(steamData);
      } else {
        const sameData = uniqueStreamData.find((o) => o.uuid === steamData.uuid);
        // not has same data
        if (!sameData) {
          uniqueStreamData.push(steamData);
        }
      }
    }
    // complete all unique streams
    for (const steamData of uniqueStreamData) {
      steamData.stream.complete();
      this.send({ op: 'unsubscribe', args: name });
    }
    // clear stream table
    this.streamTable = [];
  }

  private fetchOrNewStream<T>(channel: string | string[]): ReplaySubject<WebsocketData<T>> {
    let stream;
    // when multiple channel
    if (channel instanceof Array) {
      for (const cn of channel) {
        const result = this.streamTable.find((o) => o.name === cn);
        if (result) {
          return result.stream;
        }
      }

      // when not found, new ReplaySubject
      stream = new ReplaySubject<WebsocketData<T>>(1);
      const _uuid = uuid();
      for (const cn of channel) {
        // put into streamTable
        this.streamTable.push({
          uuid: _uuid,
          name: cn,
          stream,
        });
      }

      return stream;
    }

    // when single channel
    const res = this.streamTable.find((o) => o.name === channel);
    if (!res) {
      stream = new ReplaySubject<WebsocketData<T>>(1);
      this.streamTable.push({
        uuid: uuid(),
        name: channel,
        stream,
      });
    } else {
      stream = res.stream;
    }

    return stream;
  }

  private delStream(streamName: string | string[]): void {
    const streamData = this.streamTable.find((data, index) => {
      if (data.name === streamName) {
        // delete stream data
        this.streamTable.splice(index, 1);

        return true;
      }

      return false;
    });
    if (streamData) {
      // find other data from same uuid
      const otherSteam = this.streamTable.find((o) => o.uuid === streamData.uuid);
      // not found
      if (!otherSteam) {
        // complete stream
        streamData.stream.complete();
      }
    } else {
      // 查找是否退订频道的全部商品
      const ep = [...Object.values(PrivateEndPoints), ...Object.values(PublicEndPoints)].find((endpoint) => endpoint === streamName);
      if (ep) {
        for (const [index, data] of this.streamTable.entries()) {
          if (data.name.includes(ep)) {
            data.stream.complete();
            // delete stream data
            this.streamTable.splice(index, 1);
          }
        }
      }
    }
  }
}
