import { WebSocketRxJs } from 'dripjs-common';

import { getWSAuthQuery } from '../../../common';
import { BitmexConfig, bitmexWsEndpoints } from '../../../types';

/**
 * Abstract class for websocket api
 *
 * @param T: ws send request type
 * @param U: raw ws response type
 */
export abstract class WebsocketBase<T, U> {
  private ws: WebSocketRxJs<U> | null = null;
  constructor(private readonly config: BitmexConfig) {}

  abstract handleMessage(response: U): void;
  abstract onDestroy(): void;

  send(request: T): void {
    if (!this.ws) {
      this.init();
    }

    if (this.ws) {
      this.ws.send(JSON.stringify(request));
    }
  }

  destroy(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.onDestroy();
  }

  private init(): void {
    const requestUrl = this.makeRequestUrl();
    this.ws = new WebSocketRxJs(requestUrl);
    this.ws.message$.subscribe((response) => {
      this.handleMessage(response);
    });
  }

  private makeRequestUrl(): string {
    let endpoint = this.config.testnet ? bitmexWsEndpoints.testnet : bitmexWsEndpoints.production;
    if (this.config.apiKey && this.config.apiSecret) {
      endpoint += `?${getWSAuthQuery(this.config.apiKey, this.config.apiSecret)}`;
    }

    return endpoint;
  }
}
