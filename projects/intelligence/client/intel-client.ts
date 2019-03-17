import { SocketIORxjs } from 'dripjs-common';
import { SupportedExchange } from 'dripjs-types';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IntelChannel, IntelRealtimeResponse } from '../service';

export interface IntelClientOptions {
  ip: string;
  port: number;
  username: string;
  password: string;
}

export class IntelClient {
  private ioRxjs: SocketIORxjs;

  constructor(private readonly options: IntelClientOptions) {}

  connect(): void {
    this.ioRxjs = new SocketIORxjs(`http://${this.options.ip}:${this.options.port}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            username: this.options.username,
            password: this.options.password,
          },
        },
      },
    });
  }

  disconnect(): void {
    this.ioRxjs.close();
  }

  async getSymbols(exchange: SupportedExchange): Promise<Symbol[]> {
    return new Promise((resolve, reject) => {
      try {
        this.ioRxjs.emit('symbols', exchange, (res) => {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  ticker$(exchange: SupportedExchange, symbol: string): Observable<IntelRealtimeResponse> {
    const channel = IntelChannel.Ticker;

    return this.subscribe(channel, exchange, symbol);
  }

  stopTicker(exchange: SupportedExchange, symbol: string): void {
    const channel = IntelChannel.Ticker;
    this.unsubscribe(channel, exchange, symbol);
  }

  depth$(exchange: SupportedExchange, symbol: string): Observable<IntelRealtimeResponse> {
    const channel = IntelChannel.Depth;

    return this.subscribe(channel, exchange, symbol);
  }

  stopDepth(exchange: SupportedExchange, symbol: string): void {
    const channel = IntelChannel.Depth;
    this.unsubscribe(channel, exchange, symbol);
  }

  transaction$(exchange: SupportedExchange, symbol: string): Observable<IntelRealtimeResponse> {
    const channel = IntelChannel.Transaction;

    return this.subscribe(channel, exchange, symbol);
  }

  stopTransaction(exchange: SupportedExchange, symbol: string): void {
    const channel = IntelChannel.Transaction;
    this.unsubscribe(channel, exchange, symbol);
  }

  private subscribe(channel: IntelChannel, exchange: SupportedExchange, symbol: string): Observable<IntelRealtimeResponse> {
    this.ioRxjs.socket.on(channel, (res) => this.ioRxjs.next(res));
    this.ioRxjs.emit('subscribe', exchange, symbol, channel);

    return this.ioRxjs.message$.pipe(filter((res: IntelRealtimeResponse) => res.channel === channel));
  }

  private unsubscribe(channel: IntelChannel, exchange: SupportedExchange, symbol: string): void {
    this.ioRxjs.emit('unsubscribe', exchange, symbol, channel);
  }
}
